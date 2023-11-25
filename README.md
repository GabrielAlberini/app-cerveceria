# Generador de Códigos con Validaciones

Este proyecto es un generador de códigos que incluye diversas validaciones para asegurar la integridad de los datos y cumplir con ciertos requisitos.

## Características

- **Generación de Códigos**: Permite a los usuarios generar códigos únicos a partir de ciertos criterios.

- **Validaciones de Edad**: Antes de generar un código, el sistema verifica que el usuario sea mayor de 18 años.

- **Validaciones de Formulario**: Se realizan diversas validaciones en el formulario para garantizar que todos los campos estén completos y que los datos ingresados cumplan con ciertos estándares.

- **Prevención de Regeneración Rápida**: El sistema impide que se genere otro código con el mismo DNI en menos de 24 horas.

- **Persistencia de data**: Los datos se guardan en el localhost.

- **Descarga del Código como JPG**: Los usuarios pueden descargar el código generado como un archivo JPG para su conveniencia.

## Cómo Usar

1. **Completa el Formulario**: Ingresa tu nombre, DNI, fecha de nacimiento y usuario de Instagram en el formulario.

2. **Validación de Campos**: Asegúrate de que todos los campos del formulario estén completos.

3. **Validación de DNI**: Verifica que el DNI tenga entre 7 y 8 números.

4. **Generar Código**: Haz clic en el botón "Generar Código" para obtener un código único.

5. **Visualización del Código**: Una vez generado, el código aparecerá en la pantalla.

6. **Descarga del Código**: Puedes descargar el código generado como un archivo JPG haciendo clic en el botón correspondiente.

7. **Prevención de Regeneración de Código**: Si el propietario del dispositivo ya cuenta con un código, este se mostrará en pantalla hasta que hayan pasado las 24 horas desde la creación del mismo, si no, se mostrará el formulario.

## Requisitos

- **Edad Mínima**: Debes ser mayor de 18 años para poder generar un código.

- **Formato de DNI**: El DNI debe tener entre 7 y 8 números.

Esperamos que este sistema sea de utilidad para tus necesidades de generación de códigos, manteniendo la integridad de los datos y proporcionando una experiencia segura para los usuarios.
