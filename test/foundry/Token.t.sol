pragma solidity 0.8.10;

import "forge-std/Test.sol";
import "../../contracts/Token.sol";
import "forge-std/console2.sol";
import "forge-std/Vm.sol";

contract TokenTest is Test {
  Token token;

  function setUp() public {
    token = new Token();
  }

  function testDoubleTransfer(address to, uint amount0, uint amount1) public {
    token.transfer(to, amount0);
    token.transfer(to, amount1);
    assertEq(token.balanceOf(to), amount0 + amount1);
  }
}
