# ByteShop: Desarrollo de una Tienda en Línea

**ByteShop** es una aplicación de comercio electrónico construida con el stack **MERN** (MongoDB, Express, React, Node.js). Este repositorio incluye tanto el **frontend** (interfaz de usuario) como el **backend** (servidor y base de datos), permitiendo la creación de una tienda en línea moderna, eficiente y escalable.

---

## Tecnologías Utilizadas

- **MongoDB**: Base de datos NoSQL que se utiliza para almacenar la información de productos, usuarios, órdenes, entre otros. MongoDB es altamente escalable y flexible, lo que lo hace ideal para aplicaciones de comercio electrónico que manejan grandes volúmenes de datos.

- **Express.js**: Framework minimalista para Node.js que facilita la construcción del servidor backend y la gestión de las rutas y solicitudes HTTP. Express permite crear una API RESTful para que el frontend interactúe con la base de datos y realice operaciones como la obtención de productos, gestión de usuarios, y procesamiento de órdenes.

- **React.js**: Librería de JavaScript para la construcción de la interfaz de usuario (frontend). React permite crear componentes reutilizables y dinámicos, lo que mejora la experiencia del usuario al interactuar con la tienda, como agregar productos al carrito, realizar búsquedas, etc.

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor que permite ejecutar JavaScript en el backend. Node.js proporciona la base para correr el servidor Express y manejar la lógica de la aplicación.

---

## Estructura del Proyecto

El repositorio se organiza en dos grandes secciones: **Frontend** y **Backend**, que se desarrollan y ejecutan de manera independiente, pero se comunican a través de una API RESTful.

### Backend (Node.js + Express + MongoDB)

El backend maneja toda la lógica del servidor, la autenticación de usuarios, el manejo de productos y las interacciones con la base de datos. La API RESTful expone varios endpoints para que el frontend pueda realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos y las órdenes de los usuarios.

### Frontend (React)

El **frontend** de ByteShop está construido con **React**, que proporciona una interfaz interactiva y dinámica para que los usuarios naveguen por los productos, los agreguen al carrito y gestionen su cuenta. React se comunica con el backend a través de la API RESTful para realizar acciones como la autenticación y la compra de productos.

## Toast notificacions 

Se utilizo la libreria: https://react-hot-toast.com/docs/toast

--

