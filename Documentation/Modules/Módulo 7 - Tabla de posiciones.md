## Módulo 7: Tabla de posiciones
### Funcionalidad 1: Tabla general 
**Descripción:** Visualización de tabla de posiciones de los equipos del torneo activo actual y resultados obtenidos de los últimos 5 partidos

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Haber agendado al menos un partido (Módulo 5 - Funcionalidad 2)
4. Haber registrado por lo menos un resultado (Módulo 6 - Funcionalidad 1)
5. Solo visible para formato Liga y Liga (Ida y Vuelta)

**Casos de éxito**
- Caso 1: Visualización de posiciones de los equipos de acuerdo con los resultados registrados y permitir generación de PDF
- Caso 2: Opción habilitada pero sin mostrar la tabla (porque no se generó un calendario) y no permite generación de PDF

**Manejo de errores**
- Botón oculto de generar PDF en caso de no haber registros para evitar descargar un archivo que no se pueda leer
   - Casos afectados: Caso 1, generación de PDF
- En caso de no tener registros, ordenar los equipos de acuerdo a su registro

**Criterios de aceptación QA**
1. Visualización de datos generales obtenidos y resultados de partidos para determinar la posición de los jugadores

**Pruebas de validación QA**
* Registrar o modificar resultados de los equipos para actualizar su posición en la tabla sin recargar la página.
* Comprobar que los resultados registrados coincidan con la tabla.
* En caso de tener más de 5 partidos, siempre tomar los últimos registrados para ver los resultados más recientes en la columna de "últimos 5 partidos".
---
### Funcionalidad 2: Goleadores
**Descripción:** Visualizar tabla de posiciones de todos los jugadores de equipos registrados por el organizador por medio de los goles realizados en cada partido realizado con base en el torneo actual.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Haber agendado al menos un partido (Módulo 5 - Funcionalidad 2)
4. Haber registrado por lo menos un resultado (Módulo 6 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Visualización de estadísticas de goles totales de jugadores

**Criterios de aceptación QA**
1. Registro de goles 

**Pruebas de validación QA**
* Registrar o modificar goles a los jugadores registrados para ver los cambios en la tabla y el cambio de posición sin recargar la página