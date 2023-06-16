pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UnfinanceCoin is ERC20, Ownable {
    constructor() ERC20('UnfinanceCoin', 'UNF') {
       // _mint(msg.sender, 2500 * 10**18);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}