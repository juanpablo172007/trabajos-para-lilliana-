
import os
import subprocess
import webbrowser
import shutil


def check_vscode_installed():
    """Verifica si Visual Studio Code está instalado."""
    return shutil.which("code") is not None


def check_chrome_installed():
    """Verifica si Google Chrome está instalado."""
    return shutil.which("chrome") is not None or shutil.which("google-chrome") is not None


def open_vscode_with_chrome():
    """Abre Visual Studio Code y valida con Chrome como navegador principal."""
    try:
        print("🔍 Abriendo Visual Studio Code...")
        subprocess.run(["code"], shell=True)
        if check_chrome_installed():
            print("🌐 Google Chrome detectado como navegador principal.")
            webbrowser.get("chrome").open("https://code.visualstudio.com/")
        else:
            print("⚠️ Google Chrome no está instalado. Usando navegador predeterminado.")
            webbrowser.open("https://code.visualstudio.com/")
    except Exception as e:
        print(f"❌ Error al abrir VS Code o Chrome: {e}")


def instalar_extension(extension, descripcion):
    """Instala una extensión de VS Code."""
    try:
        print(f"🔧 Instalando {descripcion}...")
        result = subprocess.run(["code", "--install-extension", extension], shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {descripcion} instalada correctamente.")
        else:
            print(f"❌ Error al instalar {descripcion}: {result.stderr}")
    except Exception as e:
        print(f"❌ Error al instalar {descripcion}: {e}")


def main():
    print("=============================================")
    print(" Instalando extensiones recomendadas para VS Code")
    print("=============================================")


    # Verificar si VS Code está instalado
    if not check_vscode_installed():
        print("❌ Visual Studio Code no está instalado. Por favor, instálalo primero.")
        return


    # Lista de extensiones, incluyendo CodeGPT
    extensiones = [
        # Tailwind CSS
        ("bradlc.vscode-tailwindcss", "Tailwind CSS IntelliSense (Autocompletado, sugerencias y errores)"),
        # HTML y CSS
        ("ecmel.vscode-html-css", "Autocompletado HTML y CSS"),
        # JavaScript / TypeScript
        ("ms-vscode.vscode-typescript-next", "JavaScript/TypeScript Essentials"),
        # Python y Django
        ("ms-python.python", "Python Extension Pack"),
        ("baptiste-donaux.django", "Django snippets y soporte"),
        # PHP
        ("felixfbecker.php-intellisense", "PHP Intellisense"),
        ("bmewburn.vscode-intelephense-client", "Intelephense para PHP"),
        # React JS
        ("dsznajder.es7-react-js-snippets", "Herramientas para React"),
        # Vue JS
        ("vue.volar", "Vue JS Tooling"),
        # API Testing
        ("humao.rest-client", "REST Client para probar APIs"),
        # MySQL
        ("cweijan.vscode-mysql-client2", "MySQL Integration"),
        # Iconos de archivos
        ("vscode-icons-team.vscode-icons", "Iconos profesionales para archivos"),
        # Formateo de código
        ("esbenp.prettier-vscode", "Prettier para formateo automático"),
        # Documentación automática
        ("joelday.docthis", "Document This (comentarios automáticos)"),
        # Corrección de errores
        ("usernamehw.errorlens", "Error Lens (resaltado de errores)"),
        # IA de autocompletado
        ("GitHub.copilot", "GitHub Copilot (IA para código)"),
        # CodeGPT
        ("danielpinto8zz6.copilot-gpt4-service", "CodeGPT (IA avanzada para código)"),
        # Tema profesional
        ("zhuangtongfa.Material-theme", "One Dark Pro (tema para desarrolladores)"),
        # Traductor
        ("rafaelmaiolla.remote-vscode-translator", "Traductor en VS Code (inglés ⇄ español)")
    ]


    # Instalar extensiones
    for ext, desc in extensiones:
        instalar_extension(ext, desc)


    # Validar con Chrome
    open_vscode_with_chrome()


    print("\n✅ Todas las extensiones fueron instaladas.")
    print("🔄 Si tenías VS Code abierto, reinícialo para aplicar los cambios.")


if __name__ == "__main__":
    main()


