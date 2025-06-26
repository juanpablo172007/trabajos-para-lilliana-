//simular un fech con una promesa que devuelve un valor
//1. crear una promesa
//2. ejecutar la promesa
//3. en el then de la promesa
//4. en el catch de la promesa

// function obtenerUsuario() {
//     // Definir la constante datos antes del setTimeout
//     const datos = [
//         {id: 1, nombre: 'Juan', correo: 'juan@gmail.com'},
//         {id: 2, nombre: 'perri', correo: 'perri@gmail.com'},
//         {id: 3, nombre: 'Eliberto', correo: 'eliberto@gmail.com'}
//     ];

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(datos);
//         }, 2000);
//     });
// }


function obtenerUsuario(){// creando la promesas
    return new Promise((resolve, reject) => {
      // 1. crear una promesa
      setTimeout(() => {
        // 2. ejecutar la promesa
        // 3. en el then de la promesa,
        const datos = [
          { id: 1, nombre: "Sena", correo: "sena@gmail.com" },
          { id: 2, nombre: "Camilo", correo: "camilo@gmail.com" },
          { id: 3, nombre: "Veronica", correo: "Veronica@gmail.com" },
        ];
        resolve(datos); // 3. en el then de la promesa,
      }, 2000); // 2. ejecutar la promesa
    });
}
// mostrar los datos del usuario
obtenerUsuario()


  .then((usuarios) => {
    // 4. en el catch de la promesa,
    usuarios.forEach((usuario) => {
      const div = document.createElement("div");
      div.classList.add("usuario"); // agregar la clase usuario
      div.innerHTML = `<strong> ID </strong> ${usuario.id}<br/><strong> Nombre</strong> ${usuario.nombre}<br/><strong> Correo</strong>${usuario.correo};`;
      contenedor.appendChild(div);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  const contenedor = document.getElementById("contenedor");
