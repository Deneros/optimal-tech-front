# OptimalTech Frontend

## Este proyecto es el frontend de la aplicación OptimalTech, desarrollado con React y Tailwind CSS. La aplicación permite realizar operaciones CRUD sobre productos y movimientos, interactuando con el backend a través de una API REST.

### Requisitos

- Node.js (versión 18.x o superior)
- Docker (opcional para contenerización)

### Instalación y ejecución

#### Sin Docker

1. Clona este repositorio:

    ```bash
    git clone https://github.com/Deneros/optimal-tech-front.git
    cd optimal-tech-front
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura la URL del backend en `src/services/api.js`:

    ```javascript
    export const BACKEND_URL = 'http://localhost:8080'; // O la URL de producción
    ```

4. Ejecuta el proyecto en modo desarrollo:

    ```bash
    npm run dev
    ```

5. Accede a la aplicación en tu navegador en `http://localhost:5173`.

#### Con Docker

1. Construye la imagen de Docker:

    ```bash
    docker build -t optimaltech-frontend .
    ```

2. Corre el contenedor de Docker:

    ```bash
    docker run -p 3000:80 optimaltech-frontend
    ```

3. Accede a la aplicación en `http://localhost:3000`.

### Despliegue

El frontend se puede contenerizar y desplegar en plataformas como Render o cualquier servidor compatible con Docker.

### Tecnologías usadas

- React
- Tailwind CSS
- Vite
