import ABI from "./ABI.json"
import Web3 from "web3"

const CONTRACT_ADDRESS = "0x3B55eAe63eF285729E3598624FD511FBE0296d8d"

export async function doLogin() {
	if (!window.ethereum) throw new Error("MetaMask não está instalado!")
	const web3 = new Web3(window.ethereum)
	const accounts = await web3.eth.requestAccounts()
	if (!accounts || !accounts.length)
		throw new Error("Carteira não econtrada ou não autorizada!")
	localStorage.setItem("wallet", accounts[0])
	return accounts[0]
}

function getContract() {
	const web3 = new Web3(window.ethereum)
	const from = localStorage.getItem("wallet")
	return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from })
}

export async function criarCampanha(campaign) {
	const contract = getContract()
	return contract.methods
		.criarCampanha(
			campaign.titulo,
			campaign.descricao,
			campaign.videoUrl,
			campaign.imageUrl
		)
		.send()
}

export async function getLastCampaignId() {
	const contract = getContract()
	return contract.methods.nextId().call()
}

export async function getCampanha(id) {
	const contract = getContract()
	return contract.methods.campanhas(id).call()
}

export async function donate(id, donation) {
	await doLogin()
	const contract = getContract()
	return contract.methods.doar(id).send({
		value: Web3.utils.toWei(donation, "ether"),
	})
}
