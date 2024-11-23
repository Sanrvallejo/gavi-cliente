# GAVI - App Cliente  

## Descripción del Proyecto  
La aplicación cliente de **GAVI** (Gestión Administrativa de Ventas e Inventarios) es una interfaz web que permite a los usuarios interactuar con el sistema para gestionar inventarios, realizar ventas, y administrar usuarios. Esta aplicación está diseñada para ser intuitiva, eficiente y adaptarse a las necesidades del negocio.  

El cliente está conectado con una aplicación servidor alojada en otro repositorio, la cual maneja la lógica de negocio y la base de datos. La comunicación entre cliente y servidor se realiza a través de una API.  

## Funcionalidad de la Interfaz  
La interfaz de la aplicación cliente incluye las siguientes funcionalidades:  
- **Gestión de usuarios:** Crear, modificar y eliminar usuarios.  
- **Registro de inventarios:** Agregar, editar y eliminar productos del inventario.  
- **Gestión de ventas:** Registrar ventas y realizar cálculos automáticos de precios y totales.  
- **Reportes básicos:** Visualizar información relevante de las operaciones realizadas.  

## Requerimientos  
Para ejecutar la aplicación cliente, necesitas lo siguiente:  
- Navegador web actualizado (Google Chrome, Mozilla Firefox, Edge, etc.).  
- Acceso a la red local o internet para comunicarse con la aplicación servidor.  
- Puede alojar la aplicación en una plataforma como Netlify y hacer las peticiones a la aplicación servidor. Tenga en cuenta que deberá **habilitar los CORS en la aplicación servidor para el nuevo origen**.

## Tecnologías Utilizadas  
La aplicación cliente está desarrollada con las siguientes tecnologías:  
- **HTML:** Para la estructura del contenido.  
- **CSS:** Para el diseño y estilos visuales.  
- **JavaScript:** Para la funcionalidad interactiva de la interfaz.  

## Conexión con la App Servidor  
La aplicación cliente consume servicios de una API REST proporcionada por la aplicación servidor, que está alojada en un repositorio independiente. La app servidor se encarga de procesar las solicitudes del cliente, interactuar con la base de datos y devolver respuestas con los datos necesarios.

Para instalar la aplicación servidor visite el siguiente repositorio y siga las instrucciones del README.

### Repositorio de la App Servidor  
[Enlace al repositorio de la App Servidor](https://github.com/Sanrvallejo/gavi-server.git) 

## Instalación  
1. Clona este repositorio en tu máquina local:  
   ```bash  
   git clone https://github.com/usuario/gavi-cliente.git  
