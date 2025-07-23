
import { useContext } from "react"
import { PersonAuthContext } from "../../contexts/person"
function ViewAtributos(){

    const {dadosPerson} = useContext(PersonAuthContext)

    function closeAtributes() {
        setShowAtributes(false) // Esconde o modal
    }
    return(
        <div className="modal-overlay" onClick={closeAtributes}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeAtributes}>X</button>
                        <ViewAtributos />
                    </div>
                </div>
    )
}

export default ViewAtributos