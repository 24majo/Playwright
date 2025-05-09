### Fase de Grupos y Eliminatorias
---
### Modalidad: Automática 
#### Creación de Torneos

**Caso 1:** Creación sin equipos iniciales (Desde "Equipos")
**Caso 2:** Creación sin equipos iniciales (Desde "Mis torneos" seleccionando existentes)
**Caso 3:** Creación con equipos seleccionados previamente
**Caso 4:** Actualización de equipos (Añadir equipo desde "Equipos")
**Caso 5:** Actualización de equipos (Elegir equipo desde "Mis torneos")
**Caso 6:** Equipo Inactivo al tener fixture generado **(pendiente)**

**Validaciones:**
- Debe seguir la misma lógica de eliminar el fixture generado en caso de realizar cambios.
- Permitir número par o impar de equipos.
- Debe de haber por lo menos 2 equipos participantes.
---

#### Cantidad de Grupos

**Caso 1:** Cantidad par de grupos.
**Caso 2:** Cantidad impar de grupos.
**Caso 3:** Grupos como potencia de 2.

**Validaciones:**
- Debe de permitir crear al menos un grupo.
- Los grupos no pueden tener menos de 3 equipos.

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

---
---

### Modalidad: Personalizada
# Pendiente