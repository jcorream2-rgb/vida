# API de experiencias profesionales

API REST con Express.js y MongoDB para administrar experiencias laborales de la hoja de vida.

## Requisitos

- Node.js 18 o superior y npm.
- MongoDB local o una instancia de MongoDB Atlas.

## Instalación y ejecución

Desde la carpeta del proyecto, instala dependencias:

```bash
npm install
```

Copia `.env.example` a `.env` y configura la conexión a MongoDB:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/hoja_vida
```

Para MongoDB Atlas, sustituye `MONGODB_URI` por la cadena de conexión de tu clúster. Inicia el servidor:

```bash
npm run dev
```

La API estará en `http://localhost:3000`. La documentación interactiva de Swagger está en `http://localhost:3000/api-docs` y el estado de conexión se consulta en `http://localhost:3000/api/health`.

## Endpoints

| Método | Ruta | Acción | Respuesta esperada |
| --- | --- | --- | --- |
| GET | `/api/health` | Estado del servidor y MongoDB | `200` conectado, `503` desconectado |
| GET | `/api/experiencias` | Listar experiencias | `200` |
| POST | `/api/experiencias` | Crear una experiencia | `201` |
| GET | `/api/experiencias/:id` | Consultar una experiencia | `200`, `400` o `404` |
| PUT | `/api/experiencias/:id` | Reemplazar una experiencia | `200`, `400` o `404` |
| DELETE | `/api/experiencias/:id` | Eliminar una experiencia | `204`, `400` o `404` |

Las rutas de experiencias devuelven `503` si MongoDB no está conectado. Las solicitudes de creación y actualización deben usar `Content-Type: application/json` y este formato:

```json
{
  "puesto": "Desarrollador Full Stack",
  "empresa": "Digital Innovations Ltd.",
  "fechaInicio": "2021",
  "fechaFin": "2026",
  "descripcion": "Desarrollo de aplicaciones web y plataformas empresariales.",
  "logros": [
    "Desarrollo con React y Node.js",
    "Implementación de pruebas automatizadas"
  ]
}
```

`fechaFin` puede ser `"Actualidad"` para el empleo vigente. `logros` es opcional y por defecto es una lista vacía. La API genera `_id`, `createdAt` y `updatedAt`.

## Prueba con Postman

Importa `postman/experiencias-api.postman_collection.json` en Postman. Ejecuta las solicitudes en orden: salud, crear, listar, consultar por ID, actualizar, eliminar y consultar el ID eliminado. La solicitud de creación guarda el `_id` automáticamente como variable de colección para las siguientes solicitudes. MongoDB debe estar iniciado antes de ejecutar el flujo.

También puedes probar cada endpoint desde Swagger en `/api-docs`; expande la operación y selecciona **Try it out**.