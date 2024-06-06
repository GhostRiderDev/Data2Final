import Swal from "sweetalert2"
export function AlertsExito() {
    Swal.fire({
        title: 'Exito',
        text: 'Se ha agregado el contacto',
        icon: 'success',
        confirmButtonText: 'Ok'
    })

}