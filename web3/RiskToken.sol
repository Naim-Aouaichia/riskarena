// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// OpenZeppelin Core
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title RiskArena Token (RISK)
 * @dev ERC20 token with mint, burn, pause, cap, snapshot, voting, roles, upgradeable.
 */
contract RISK is 
    ERC20, 
    ERC20Burnable, 
    ERC20Pausable, 
    ERC20Capped, 
    ERC20Snapshot, 
    ERC20Votes, 
    Ownable, 
    AccessControl, 
    UUPSUpgradeable, 
    ReentrancyGuard 
{
    // supply cap
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10**18;

    bytes32 public constant SNAPSHOT_ROLE = keccak256("SNAPSHOT_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(uint256 initialMint)
        ERC20("RiskArena Token", "RISK")
        ERC20Capped(MAX_SUPPLY)
        ERC20Permit("RiskArena Token")
    {
        // roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(SNAPSHOT_ROLE, msg.sender);
        _setupRole(UPGRADER_ROLE, msg.sender);

        require(initialMint <= MAX_SUPPLY, "Initial mint exceeds cap");
        _mint(msg.sender, initialMint);
    }

    // mint new tokens with role check, reentrancy-safe
    function mint(address to, uint256 amount) 
        external 
        onlyRole(MINTER_ROLE) 
        nonReentrant 
    {
        _mint(to, amount);
    }

    // take snapshot for airdrop, governance, history
    function snapshot() 
        external 
        onlyRole(SNAPSHOT_ROLE) 
        returns (uint256) 
    {
        return _snapshot();
    }

    // pause/unpause transfers and snapshots
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // required override: before token transfer, enforce pause, cap, snapshot, votes
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal 
        override(ERC20, ERC20Pausable, ERC20Snapshot, ERC20Capped) 
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    // overrides for integrations
    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal 
        override(ERC20, ERC20Votes) 
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) 
        internal 
        override(ERC20, ERC20Capped, ERC20Votes) 
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) 
        internal 
        override(ERC20, ERC20Votes) 
    {
        super._burn(account, amount);
    }

    // UUPS upgrade authorization
    function _authorizeUpgrade(address newImplementation)
        internal 
        onlyRole(UPGRADER_ROLE) 
        override 
    {}

    // decimals override (default 18)
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}