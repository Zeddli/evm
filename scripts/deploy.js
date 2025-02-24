async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const BattleGame = await ethers.getContractFactory("BattleGame");
    const battleGame = await BattleGame.deploy();
    
    // Wait for the deployment to be mined
    await battleGame.waitForDeployment();
  
    console.log("BattleGame deployed to:", battleGame.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  