// function leerJson(url){ // funcion que recibe la url
//

// 1

//     return new Promise((resolve,reject)=>{ // funcion que devuelve una promesa
//         // fetch devuelve una promesa
//         // .then es una funcion que recibe una funcion anonima
//         fetch(url)
//         .then(respuesta=>{
//             if (!response.ok) throw new Error('Error de la API 404');
//             return respuesta.json();
//         })
//         .then(resultado=>{resolve(data);
//         })
//         .catch(error=>{  reject(error);
//         })
//     });
// }

// leerJson(datos.json)

// .then(usuario=>{
//     console.log(usuario);
// })

// .catch(error=>{
//     console.log(error);
// })

// 2
// function leerJson(url) {
//     return new Promise((resolve, reject) => {
//         fetch(url)
//             .then(respuesta => {
//                 if (!respuesta.ok) {
//                     throw new Error("Error: " + respuesta.status + " " + respuesta.statusText);
//                 }
//                 return respuesta.json();
//             })
//             .then(resultado => resolve(resultado))
//             .catch(error => reject(error));
//     });
// }


// leerJson('datos.json')
//     .then(usuario => {
//         console.log(usuario);
//     })
//     .catch(error => {
//         console.log(error);
//     });


// crear el document para poder usar el DOM
// dentro de el creamos la funcion que se ejecuta cuando el documento este cargado
// es el que va simular  promesa
document.addEventListener("DOMContentLoaded", () => {
    // Configuración de voz
    const synth = window.speechSynthesis;
    let audioEnabled = false;
    const soundEffect = document.getElementById("sound-effect");
    const btnAudio = document.getElementById("btn-audio");
    const btnStop = document.getElementById("btn-stop");

    // Controladores de botones
    btnAudio.addEventListener("click", () => {
        audioEnabled = true;
        btnAudio.classList.add("bg-green-600", "hover:bg-green-700");
        btnAudio.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
        btnAudio.innerHTML = '<span>🔊 Voz Activada</span>';
        playSound();
        speak("Voz activada. Haz clic en cualquier nombre para escucharlo");
    });

    btnStop.addEventListener("click", () => {
        audioEnabled = false;
        synth.cancel();
        btnAudio.classList.remove("bg-green-600", "hover:bg-green-700");
        btnAudio.classList.add("bg-indigo-600", "hover:bg-indigo-700");
        btnAudio.innerHTML = '<span>🔊 Activar Voz</span>';
        playSound();
    });

    // Función para reproducir sonido
    function playSound() {
        soundEffect.currentTime = 0;
        soundEffect.play();
    }

    // Función para hablar
    function speak(text) {
        if (!audioEnabled) return;
        
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        synth.speak(utterance);
    }

    // Cargar datos JSON
    function leerJson(url) {
        return fetch(url)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText} ❌`);
                }
                return respuesta.json();
            });
    }

    leerJson("datos.json")
        .then((usuarios) => {
            const cuerpoTabla = document.getElementById("tabla-body");
            cuerpoTabla.innerHTML = '';
            
            usuarios.forEach((usuario) => {
                const fila = document.createElement("tr");
                fila.className = "hover:bg-indigo-50 transition-colors";
                fila.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap font-mono text-indigo-600">${usuario.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-medium nombre-usuario cursor-pointer hover:text-indigo-700">
                        ${usuario.nombre} ${usuario.apellido || ''}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-blue-600 underline">${usuario.correo}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button class="escuchar-nombre bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition flex items-center gap-1">
                            <span>▶️ Escuchar</span>
                        </button>
                    </td>
                `;
                
                // Evento para hacer clic en el nombre
                fila.querySelector(".nombre-usuario").addEventListener("click", () => {
                    playSound();
                    speak(`Usuario: ${usuario.nombre} ${usuario.apellido || ''}`);
                });
                
                // Evento para el botón de escuchar
                fila.querySelector(".escuchar-nombre").addEventListener("click", () => {
                    playSound();
                    speak(`Datos completos: ${usuario.nombre} ${usuario.apellido || ''}. Correo: ${usuario.correo}`);
                });
                
                cuerpoTabla.appendChild(fila);
            });
            
            if (audioEnabled) {
                speak(`Se han cargado ${usuarios.length} usuarios. Haz clic en cualquier nombre para escucharlo`);
            }
        })
        .catch((error) => {
            console.error("Error al leer datos JSON", error);
            const cuerpoTabla = document.getElementById("tabla-body");
            cuerpoTabla.innerHTML = `
                <tr class="bg-red-50">
                    <td colspan="4" class="px-6 py-4 text-center text-red-600 font-medium">
                        🚨 ${error.message}
                    </td>
                </tr>
            `;
            if (audioEnabled) {
                speak("Error al cargar los datos. " + error.message);
            }
        });
});