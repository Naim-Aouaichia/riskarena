// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// Interfaces Uniswap V2
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

/// OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RISKSwap is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IUniswapV2Router02 public router;
    IUniswapV2Factory public factory;
    address public WETH;

    event LiquidityAdded(address indexed tokenA, address indexed tokenB, uint amountA, uint amountB, uint liquidity);
    event LiquidityRemoved(address indexed tokenA, address indexed tokenB, uint amountA, uint amountB);
    event SwapTokens(address indexed user, address indexed tokenIn, address indexed tokenOut, uint amountIn, uint amountOut);

    constructor(address _router) {
        require(_router != address(0), "Zero address router");
        router = IUniswapV2Router02(_router);
        factory = IUniswapV2Factory(router.factory());
        WETH = router.WETH();
    }

    /// @notice Ajout de liquidité sur une paire ERC20
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        uint deadline
    ) external nonReentrant {
        IERC20(tokenA).safeTransferFrom(msg.sender, address(this), amountADesired);
        IERC20(tokenB).safeTransferFrom(msg.sender, address(this), amountBDesired);
        IERC20(tokenA).safeApprove(address(router), amountADesired);
        IERC20(tokenB).safeApprove(address(router), amountBDesired);

        (uint amtA, uint amtB, uint liquidity) = router.addLiquidity(
            tokenA, tokenB,
            amountADesired, amountBDesired,
            amountAMin, amountBMin,
            msg.sender,
            deadline
        );

        // reset allowance
        IERC20(tokenA).safeApprove(address(router), 0);
        IERC20(tokenB).safeApprove(address(router), 0);

        emit LiquidityAdded(tokenA, tokenB, amtA, amtB, liquidity);
    }

    /// @notice Retrait de liquidité d'une paire ERC20
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        uint deadline
    ) external nonReentrant {
        address pair = factory.getPair(tokenA, tokenB);
        require(pair != address(0), "Pair nonexistent");

        IERC20(pair).safeTransferFrom(msg.sender, address(this), liquidity);
        IERC20(pair).safeApprove(address(router), liquidity);

        (uint amtA, uint amtB) = router.removeLiquidity(
            tokenA, tokenB,
            liquidity,
            amountAMin, amountBMin,
            msg.sender,
            deadline
        );

        IERC20(pair).safeApprove(address(router), 0);

        emit LiquidityRemoved(tokenA, tokenB, amtA, amtB);
    }

    /// @notice Swap de TOKEN->TOKEN avec slippage
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        uint deadline
    ) external nonReentrant {
        require(path.length >= 2, "Invalid path");
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(path[0]).safeApprove(address(router), amountIn);

        uint[] memory amounts = router.swapExactTokensForTokens(
            amountIn, amountOutMin, path, msg.sender, deadline
        );

        IERC20(path[0]).safeApprove(address(router), 0);

        emit SwapTokens(msg.sender, path[0], path[path.length-1], amounts[0], amounts[amounts.length-1]);
    }

    /// @notice Swap avec ETH ↔ TOKEN
    receive() external payable {}

    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        uint deadline
    ) external payable nonReentrant {
        require(path[0] == WETH, "Path must start with WETH");

        uint[] memory amounts = router.swapExactETHForTokens{ value: msg.value }(
            amountOutMin, path, msg.sender, deadline
        );

        emit SwapTokens(msg.sender, WETH, path[path.length-1], msg.value, amounts[amounts.length-1]);
    }

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        uint deadline
    ) external nonReentrant {
        require(path[path.length-1] == WETH, "Path must end with WETH");

        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(path[0]).safeApprove(address(router), amountIn);

        uint[] memory amounts = router.swapExactTokensForETH(
            amountIn, amountOutMin, path, msg.sender, deadline
        );

        IERC20(path[0]).safeApprove(address(router), 0);

        emit SwapTokens(msg.sender, path[0], WETH, amounts[0], amounts[amounts.length-1]);
    }
}