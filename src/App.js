import { Grid, Button, Alert, Box, Divider, Paper, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { PanTool, Person, Send } from '@mui/icons-material';
import { providers, Contract } from "ethers";

const greetingsCtcABI = JSON.parse(`{
  "_format": "hh-sol-artifact-1",
  "contractName": "Greetings",
  "sourceName": "contracts/greetings.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "greeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "seeGreeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "updateGreeting",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060405180606001604052806030815260200161050960309139805161003e91600091602090910190610044565b50610118565b828054610050906100dd565b90600052602060002090601f01602090048101928261007257600085556100b8565b82601f1061008b57805160ff19168380011785556100b8565b828001600101855582156100b8579182015b828111156100b857825182559160200191906001019061009d565b506100c49291506100c8565b5090565b5b808211156100c457600081556001016100c9565b6002810460018216806100f157607f821691505b6020821081141561011257634e487b7160e01b600052602260045260246000fd5b50919050565b6103e2806101276000396000f3fe6080604052600436106100345760003560e01c80632867cc4414610039578063e01370231461004e578063ef690cc014610079575b600080fd5b61004c61004736600461025e565b61008e565b005b34801561005a57600080fd5b506100636100a5565b6040516100709190610308565b60405180910390f35b34801561008557600080fd5b50610063610137565b80516100a19060009060208401906101c5565b5050565b6060600080546100b49061035b565b80601f01602080910402602001604051908101604052809291908181526020018280546100e09061035b565b801561012d5780601f106101025761010080835404028352916020019161012d565b820191906000526020600020905b81548152906001019060200180831161011057829003601f168201915b5050505050905090565b600080546101449061035b565b80601f01602080910402602001604051908101604052809291908181526020018280546101709061035b565b80156101bd5780601f10610192576101008083540402835291602001916101bd565b820191906000526020600020905b8154815290600101906020018083116101a057829003601f168201915b505050505081565b8280546101d19061035b565b90600052602060002090601f0160209004810192826101f35760008555610239565b82601f1061020c57805160ff1916838001178555610239565b82800160010185558215610239579182015b8281111561023957825182559160200191906001019061021e565b50610245929150610249565b5090565b5b80821115610245576000815560010161024a565b60006020828403121561026f578081fd5b813567ffffffffffffffff80821115610286578283fd5b818401915084601f830112610299578283fd5b8135818111156102ab576102ab610396565b604051601f8201601f19908116603f011681019083821181831017156102d3576102d3610396565b816040528281528760208487010111156102eb578586fd5b826020860160208301379182016020019490945295945050505050565b6000602080835283518082850152825b8181101561033457858101830151858201604001528201610318565b818111156103455783604083870101525b50601f01601f1916929092016040019392505050565b60028104600182168061036f57607f821691505b6020821081141561039057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220cf56ea1abde5a43a4ae9f9c9880ed4b9769b9fac2128a87696cfc71311024f5864736f6c6343000802003348656c6c6f20576f726c642066726f6d20506f6c79676f6e204861636b6174686f6e207769746820536f6c6964697479",
  "deployedBytecode": "0x6080604052600436106100345760003560e01c80632867cc4414610039578063e01370231461004e578063ef690cc014610079575b600080fd5b61004c61004736600461025e565b61008e565b005b34801561005a57600080fd5b506100636100a5565b6040516100709190610308565b60405180910390f35b34801561008557600080fd5b50610063610137565b80516100a19060009060208401906101c5565b5050565b6060600080546100b49061035b565b80601f01602080910402602001604051908101604052809291908181526020018280546100e09061035b565b801561012d5780601f106101025761010080835404028352916020019161012d565b820191906000526020600020905b81548152906001019060200180831161011057829003601f168201915b5050505050905090565b600080546101449061035b565b80601f01602080910402602001604051908101604052809291908181526020018280546101709061035b565b80156101bd5780601f10610192576101008083540402835291602001916101bd565b820191906000526020600020905b8154815290600101906020018083116101a057829003601f168201915b505050505081565b8280546101d19061035b565b90600052602060002090601f0160209004810192826101f35760008555610239565b82601f1061020c57805160ff1916838001178555610239565b82800160010185558215610239579182015b8281111561023957825182559160200191906001019061021e565b50610245929150610249565b5090565b5b80821115610245576000815560010161024a565b60006020828403121561026f578081fd5b813567ffffffffffffffff80821115610286578283fd5b818401915084601f830112610299578283fd5b8135818111156102ab576102ab610396565b604051601f8201601f19908116603f011681019083821181831017156102d3576102d3610396565b816040528281528760208487010111156102eb578586fd5b826020860160208301379182016020019490945295945050505050565b6000602080835283518082850152825b8181101561033457858101830151858201604001528201610318565b818111156103455783604083870101525b50601f01601f1916929092016040019392505050565b60028104600182168061036f57607f821691505b6020821081141561039057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220cf56ea1abde5a43a4ae9f9c9880ed4b9769b9fac2128a87696cfc71311024f5864736f6c63430008020033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}`);
const greetingsCtcAddress = "0x4c0D29ae67FEa79e1b4c931d5641631333c5100a";
const polygon = "./polygon.png";

function App() {
	const [wallet, setWallet] = useState(false);
	const [connectWallet, setConnectWallet] = useState(true);
	const [accounts, setAccounts] = useState();
	const [_greeting, set_Greeting] = useState(false);
	const [greeting, setGreeting] = useState();

	useEffect(() => {
		async function fetchData() {
			if(window.ethereum) {
		        const provider = await new providers.Web3Provider(window.ethereum);
		        const contract = await new Contract(greetingsCtcAddress, greetingsCtcABI.abi, provider);

		        try {
		            const _greeting = await contract.seeGreeting();
		            console.log(_greeting);
		            set_Greeting(true);
		            setGreeting(_greeting);
		        } catch (error) {
		            console.log(error);
		        }
		    };
		};
		fetchData();
	}, []);

	const handleConnect = async(e) => {
		e.preventDefault();
		if(window.ethereum) {
			setAccounts(await window.ethereum.request({method: "eth_requestAccounts"}));
			setConnectWallet(false);
			setWallet(true);
		};
	};	

	const handleGreeting = async(e) => {
		e.preventDefault();
		if(window.ethereum) {
	        const provider = await new providers.Web3Provider(window.ethereum);
	        const signer = await provider.getSigner();
	        const contract = await new Contract(greetingsCtcAddress, greetingsCtcABI.abi, signer);   

	        try {
		        const updateGreeting = await contract.updateGreeting(greeting);
		        console.log(greeting);
		    } catch (error) {
		        console.log(error);
		    }
	    };
	};

  return (
    <Box>
    	<Grid container spacing={2} sx={{ backgroundColor: "#000000", paddingTop: 2}}>
    		<Grid item xs={3}>
    			<PanTool sx={{ fontSize: 40, color: "#ffffff", marginLeft: 14 }}/>
    		</Grid>
    		<Grid item xs={6}/>
    		{ connectWallet && 
    			<Grid item xs={3}>
	    			<Button variant="contained" sx={{ backgroundColor: "#ffffff", color: "#000000" }} onClick={handleConnect}>
	    				<Person sx={{ fontSize: 24, color: "#000000" }}/>
	    				Connect
	    			</Button>
	    		</Grid>
	    	}
    		{ wallet && 
    			<Grid item xs={3}>
    				<Person sx={{ fontSize: 24, color: "#ffffff" }}/>
    				<span style={{ color: "#ffffff" }}>Connected</span>
    			</Grid>
    		}
    	</Grid>
    	<Grid container sx={{ marginTop: 10 }} >
    		<Grid item xs={2}/>
    		<Grid item xs={8}>
    			<Paper elevation={3} sx={{ paddingBottom: 4 }}>
    				<Grid container>
			    		<Grid item xs={2}/>
			    		<Grid item xs={8}>
			    			<h2 style={{ color: "#000000", textDecoration: "underline" }}>Send your Greetings to the Polygon Blockchain</h2>
			    		</Grid>
			    		<Grid item xs={2}/>
			    	</Grid>
			    	{ _greeting && 
			    		<Grid container>
				    		<Grid item xs={2}/>
				    		<Grid item xs={8}>
				    			<h1 style={{ color: "#000000" }}>{greeting}</h1>
				    		</Grid>
				    		<Grid item xs={2}/>
				    	</Grid>
				    }
			    	<Grid container>
			    		<Grid item xs={1}/>
			    		<Grid item xs={10}>
			    			<TextField label="Greetings" variant="outlined" onChange={(e) => setGreeting(e.target.value)}/>
			    		</Grid>
			    		<Grid item xs={1}/>
			    	</Grid>
			    	<Grid container>
			    		<Grid item xs={1}/>
			    		<Grid item xs={10}>
			    			<Divider>Greetings</Divider>
			    		</Grid>
			    		<Grid item xs={1}/>
			    	</Grid>
			    	<Grid container>
			    		<Grid item xs={3}/>
			    		<Grid item xs={6}>
			    			<Button variant="contained" sx={{ backgroundColor: "#ffffff", color: "#000000", marginTop: 2 }} onClick={handleGreeting}>
			    				<Send sx={{ fontSize: 24, color: "#000000" }}/>
			    				Send your Greeting
			    			</Button>
			    		</Grid>
			    		<Grid item xs={3}/>
			    	</Grid>
    			</Paper>
    		</Grid>
    		<Grid item xs={2}/>
    	</Grid>
    </Box>
  );
}

export default App;