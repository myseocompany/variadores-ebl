variadores-ebl

## Integración con CRM en Laravel

Para enviar los leads del formulario de cotización hacia tu CRM hecho en Laravel se habilitó un consumo HTTP directo desde el front-end.

1. Crea un endpoint en Laravel que reciba el payload del formulario (por ejemplo `/api/leads`). Se espera un cuerpo JSON con los campos `nombre`, `empresa`, `telefono`, `correo` y `mensaje`.
2. Asegúrate de permitir solicitudes CORS desde el dominio de la landing y, si usas autenticación basada en tokens, genera una clave específica para el sitio.
3. Crea un archivo `.env` en la raíz del proyecto basado en `.env.example` y actualiza la variable `VITE_CRM_LEADS_ENDPOINT` con la URL pública de tu endpoint.
4. Vuelve a ejecutar `npm run dev` o `npm run build` para que Vite tome la nueva configuración.

Cuando un visitante envía el formulario, la aplicación realizará una petición `POST` al endpoint configurado. Si la API responde con un código distinto de 2xx, se mostrará un mensaje de error amigable en pantalla para que el usuario pueda volver a intentar el envío.

## Opciones de despliegue junto a Laravel

Esta landing está construida con React + Vite y se entrega como un paquete de archivos estáticos. **No es necesario convertirla a una vista Blade** para usarla con Laravel. Puedes desplegarla en el mismo servidor del backend o en un hosting independiente; la integración con el CRM seguirá funcionando siempre que la variable `VITE_CRM_LEADS_ENDPOINT` apunte al endpoint HTTPS accesible.

### Desplegar en el mismo servidor que Laravel

1. Ejecuta `npm run build` en este proyecto para generar la carpeta `dist/` con los archivos estáticos.
2. Copia el contenido de `dist/` dentro de tu proyecto Laravel, por ejemplo en `public/landing/`.
3. Crea una ruta en `routes/web.php` que devuelva ese `index.html`, por ejemplo:

   ```php
   Route::get('/landing/{any?}', function () {
       return file_get_contents(public_path('landing/index.html'));
   })->where('any', '.*');
   ```

   Si prefieres servirlo directamente con Nginx o Apache, apunta el `root` al directorio copiado (`public/landing`).
4. Configura las reglas de tu servidor web para que cualquier ruta dentro de la landing resuelva al mismo `index.html` (rewrites).

### Desplegar de forma independiente

1. Ejecuta `npm run build` y sube la carpeta `dist/` a cualquier servicio de hosting estático (S3 + CloudFront, Netlify, Vercel, etc.).
2. Configura CORS en tu endpoint de Laravel para permitir peticiones desde el dominio público de la landing.
3. Mantén actualizado `VITE_CRM_LEADS_ENDPOINT` con la URL pública del backend.

En ambos escenarios la aplicación sigue siendo la misma SPA construida con React. Laravel únicamente expone el endpoint que recibe los datos del formulario, por lo que no es necesario duplicar componentes ni mantener versiones Blade de la UI.
