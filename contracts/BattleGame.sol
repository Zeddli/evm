// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BattleGame {
    // Events
    event BattleResult(address indexed challenger, address indexed opponent, string outcome);
    event NFTReward(address indexed winner, uint256 rewardAmount);

    // Generate a pseudo-random number between 0 and 99 (for example)
    function _getRandom() internal view returns (uint256) {
        // Note: This is insecure for production but acceptable for demo
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 100;
    }

    // Updated battle function with randomness
    function battle(address opponent) public returns (bool) {
        uint256 rand = _getRandom();
        string memory outcome;
        
        // For example: if random number is less than 50, challenger wins; else opponent wins
        if (rand < 50) {
            outcome = "Challenger Wins!";
            _rewardWinner(msg.sender, 3); // Reward challenger with NFTs
        } else {
            outcome = "Opponent Wins!";
            _rewardWinner(opponent, 3); // Reward opponent with NFTs
        }
        emit BattleResult(msg.sender, opponent, outcome);
        return true;
    }

    // Function to simulate NFT asset transfer (reward)
    function _rewardWinner(address winner, uint256 rewardAmount) internal {
        emit NFTReward(winner, rewardAmount);
    }

    // Public function to be called externally
    function challengeBattle(address opponent) public returns (bool) {
        bool success = battle(opponent);
        return success;
    }
}
