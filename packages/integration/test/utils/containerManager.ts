import { spawn } from "child_process";

const compose = require("docker-compose");
const path_to_yml = "./ops/";
//should emulate docker:all:up
async function wrapDockerUp(ymlNames:string[]){
  
  const wrapped = [];
  for(const ymlName of ymlNames){
    wrapped.push(
      new Promise((res)=>{
        res(compose.upAll({cwd:path_to_yml, config:ymlName}));
      })
    );
  }
  return wrapped;
}
export async function startContainers(){
  //setup chains
  const chains =  async() => await compose.upAll({cwd:path_to_yml, config: "chains.docker-compose.yml"});
  const messaging = async() =>  await compose.upAll({cwd:path_to_yml, config: "messaging.docker-compose.yml"});
  const signer =   async() => await compose.upAll({cwd:path_to_yml, config: "web3signer.docker-compose.yml"});
  const sleep = async() => {return new Promise((res)=>setTimeout(res, 10_000));};
  const router = async()=> await compose.upAll({cwd:path_to_yml, config: "router.docker-compose.yml"});

  // const wrappedDockerUps = await wrapDockerUp(["chains.docker-compose.yml", "messaging.docker-compose.yml", "web3signer.docker-compose.yml"]);

  //sequential
  for(const task of [chains, messaging, signer, sleep, router]){
    console.log(`Composing ${task.name}`);
    await task();
  }
}
export async function setupChainIntegration(){
  const child = spawn("../../setup-integration-test.sh");
  child.stdout.on('data', (chunk)=>{
    console.log(`\n\n${chunk}`);
  });
  child.on('close', (code)=>{
    console.log(`\n\n Integration chain Setup Complete ECODE: ${code}`);
    return new Promise((res)=>(res(code)));
  });

  return new Promise((res)=>setTimeout(res, 90_000));

}

// const compose = require("docker-compose");

// const path_to_yml = "./ops/";

// async function initDocker(){
//   let router;
//   const msg = await compose.upAll({cwd:path_to_yml, config:"messaging.docker-compose.yml", composeOptions:["--f"]});
//   const chains = await compose.upAll({cwd:path_to_yml, config: "chains.docker-compose.yml"});
  
//   const child =  spawn('../../setup-integration-test.sh');
//   child.stdout.on('data', (chunk)=>{
//     console.log(`\n\n${chunk}`);
//   });


//   child.on('close', async(code)=>{
//     console.log(`\n\n process exit: ${code}`);
//     router = await compose.upAll({cwd:path_to_yml, config: "router.docker-compose.yml"});
//   });
    
//   return [msg, chains, router];
// }
