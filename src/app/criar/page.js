"use client"

import { useState } from "react"
import { criarCampanha, getLastCampaignId } from "@/services/Web3Service"

export default function Criar() {
	const [message, setMessage] = useState("")
	const [campaign, setCampaign] = useState({
		titulo: "",
		descricao: "",
		videoUrl: "",
	    imageUrl: "",
	})

	function onInputChange(evt) {
		setCampaign((prevState) => ({
			...prevState,
			[evt.target.id]: evt.target.value,
		}))
	}

	function onSaveClick() {
		setMessage("Salvando campanha...")
		criarCampanha(campaign)
			.then((tx) => getLastCampaignId())
			.then((id) =>
				setMessage(
					`Campanha criada com sucesso! ID: ${id}. Use esse link para divulgar sua campanha: https://donateweb3.vercel.app/campanha/${id}`
				)
			)
			.catch((err) => {
				console.error(err)
				setMessage(err.message)
			})
	}

	return (
		<>
			<div className="container px-4 py-5">
				<h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">
					Criar Campanha
				</h1>
				<p className="lead">
					Preencha os campos abaixo para criar sua campanha.
				</p>
				<hr className="mb-4" />
				<div className="col-6">
					<div className="form-floating mb-3">
						<input
							type="text"
							id="titulo"
							className="form-control"
							onChange={onInputChange}
							value={campaign.titulo || ""}
						/>
						<label htmlFor="titulo">Título:</label>
					</div>
					<div className="form-floating mb-3">
						<textarea
							id="descricao"
							className="form-control"
							onChange={onInputChange}
							value={campaign.descricao || ""}
						/>
						<label htmlFor="descricao">Descrição:</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							id="videoUrl"
							className="form-control"
							onChange={onInputChange}
							value={campaign.videoUrl || ""}
						/>
						<label htmlFor="videoUrl">URL do Vídeo:</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							id="imageUrl"
							className="form-control"
							onChange={onInputChange}
							value={campaign.imageUrl || ""}
						/>
						<label htmlFor="imageUrl">URL da Imagem:</label>
					</div>
					<div className="col-12 mb-3">
						<button
							type="button"
							className="btn btn-primary col-12 p-3"
							onClick={onSaveClick}
						>
							Salvar
						</button>
					</div>
					{
                    message && <div className="alert alert-success mt-3" role="alert"><strong>{message}</strong></div>
					}
				</div>
			</div>
		</>
	)
}
