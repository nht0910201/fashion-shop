import Swal from 'sweetalert2'
function Success({text}) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    return (
          swalWithBootstrapButtons.fire({
            title: 'SUCCESSFULLY',
            text: text,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: false
          })
     );
}

export default Success;