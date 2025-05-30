### Fase de Grupos y Eliminatorias
---
#### Creación de Torneos

**Caso 1:** Seleccionar equipos antes de crear el torneo.
**Caso 2:** Crear un nuevo equipo (Añadir equipo desde "Equipos")
   - **Caso 2.1:** Con fixture generado

**Caso 3:** Actualización de equipos (Elegir equipo desde "Mis torneos")
   - **Caso 3.1:** Con fixture generado

**Caso 4:** Equipo inactivo
   - **Caso 4.1:** Con fixture generado

**Caso 5:** Crear torneos sin equipos y cambiar el formato a grupos.

**Validaciones:**
- Debe seguir la misma lógica de eliminar el fixture generado en caso de realizar cambios.
- Permitir número par o impar de equipos.
- Debe de existir por lo menos 1 grupo.
- Debe de haber por lo menos 4 equipos participantes.

---

#### Cantidad de Grupos

**Caso 1:** Cantidad par de grupos.
**Caso 2:** Cantidad impar de grupos.
**Caso 3:** Creación de un grupo.

**Validaciones:**
- Debe de permitir crear al menos un grupo.
- Los grupos no pueden tener menos de 2 equipos.
- Tomar en cuenta las cantidades de equipos permitidos de acuerdo con el plan actual.

---
#### Modificaciones del torneo
**Caso 1:** Modificar la modalidad
   - **Caso 1.1:**  Con formato inicial de grupos antes de crear el torneo.
   - **Caso 1.2:** Modificar después de haber creado el torneo.

**Caso 2:** Modificar el formato
   - **Caso 2.1:** Cambiar un torneo de cualquier formato a fase de grupos
   - **Caso 2.2:** Cambiar de fase de grupos a otro formato y volver a grupos.

---

#### Fase de Eliminatorias

**Caso 1:** Verificación lógica de eliminatoria

**Caso 2:** Verificación del ganador 
   - **Caso 2.1:** Al terminar la fase de grupos antes de generar las eliminatorias (no debe de haber un ganador todavía).
   - **Caso 2.2:** Al terminar las eliminatorias de grupos.
   - **Caso 2.3.** Actualizar los resultados cambiando al ganador.

**Caso 3:** Eliminatorias con un solo grupo

**Caso 4:** Condiciones para clasificación por fase de grupos
   - **Caso 4.1:** Grupos de 2 equipos
   - **Caso 4.2**: Grupos de más de 2 equipos

**Caso 5:** Validación de enfrentamientos entre equipos de diferentes grupos
   - **Caso 5.1:** Eliminación directa
   - **Caso 5.2:** Eliminación ida y vuelta

**Validaciones:**
- Si los grupos solo tienen 2 equipos, pasa el equipo que quedó en primera posición.
- Si hay más de 2 equipos, pasan los primeros 2 equipos.
- Las generación del fixture en eliminatorias (ida / ida y vuelta) debe de seguir las mismas condiciones (potencia de 2).
