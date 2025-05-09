## Módulo 9: Mis pagos
### Sección 1: Resumen
#### Funcionalidad 1: Suscripción actual del organizador
**Descripción:** Cuadro de detalles que permite ver los elementos actuales del organizador de acuerdo con su plan actual, así como botones para añadir elementos o administrar su suscripción.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener un plan activo
4. (Opcional) Tener al menos un addon adquirido (Módulo 9 - Sección 2 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Vista de detalles y límites del plan actual del organizador
- Caso 2: Redirección a comprar elementos (Addons)
- Caso 3: Redirección a cambiar plan (paga con mayor o menor beneficio)
- Caso 4: Cambio de vista para administrar suscripción

**Manejo de errores**
- En caso de que la cantidad de elementos supere a la permitida por el plan actual, envía a una pantalla de selección de desactivación.
    - *Casos afectados:* Caso 1. Vista del plan actual del organizdor.

**Criterios de aceptación QA**
| 1. Plan | Elemento | Condición |
|:-------:|:---------|:----------|
|1.1|Equipo| Equipos totales registrados | 
|1.2|Torneos| Torneos activos en el perfil |
|1.3|Jugadores| Jugadores registrados correctamente en un equipo | 
|1.4|Límite|Beneficios del plan + Addons (opcional) |
|1.5|Precio|Se muestra de acuerdo al costo del plan actual |
|1.6|Título y descripción|Elementos que cambian por tipo de plan |
|1.7|Fecha de cambio de plan|Al realizar un downgrade (cambio a un plan menor) o desactivar la suscripción|

|2. Botones | Elemento | Acción |
|:---------:|:---------|:-------|
|2.1| Comprar elementos | Redirección a Tienda |
|2.2| Cambiar plan | Despliega menú de selección |
|2.2.1| Cambiar plan | Redirección a Suscripción |
|2.2.2| Administrar suscripción |Cambio de vista para Administrar suscripción|

**Pruebas de validación QA**
* Añadir/eliminar elementos para validar el conteo en cada una de las secciones
* Comprobar la muestra de funcionamiento del menú de desactivación de elementos en caso de que se supere el límite
* Cambio de límite de elementos de acuerdo con el plan actual y si se tiene o no Addons añadidos
* Verificar el cambio de plan en caso de que se realice un downgrade o se cancele la sucripción
* Validar que la fecha de cambio de plan sea por los días restantes del plan actual del organizador
* Botones visibles, interactuables y redirección correcta 

---

#### Funcionalidad 2: Facturación y pago 
**Descripción:** Cuadro de detalles que permite ver los detalles del método de pago actual o agregar uno nuevo, así como una opción de despliegue para observar los detalles del plan actual (costo por mes, fecha del siguiente pago, elementos adquiridos (plan y/o addon) y total de los mismos).

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener un plan activo
4. (Opcional) Tener un método de pago
5. (Opcional) Tener Addons adquiridos

**Casos de éxito**
- Caso 1: Añadir método de pago
- Caso 2: Visualización de detalles de compra (plan y/o Addon)

**Manejo de errores**
- Error de agregación de método de pago
   - *Mensaje de error:* No se puedo crear el método de pago
   - Caso afectado: Caso 1. Añadir método de pago
   - Acción: No se añade tarjeta

**Criterios de aceptación QA**
1. Añadir y visualizar método de pago predeterminado
2. Visualizar detalles de fecha y cantidad de pago por adquisición de plan y/o Addon(s)
3. Comprobar fecha de cambio de plan o cancelación de suscripción
4. Comprobar opción de desactivación de elementos en caso de tener un excedente

**Pruebas de validación QA**
* Añadir un nuevo método de pago y visualizar si se ha añadido.
* Adquirir Addons para verificar que se agregó a la orden de pago
* Comprar un plan para validar que se agregó a la orden de pago
* Validar que se refleje plan y addon(s) si se compraron ambos 
* Asegurarse de que el pago por todos los beneficios adquiridos sea el correcto
* Comprobar que la fecha de corte de pago sea la correcta 

---

#### Funcionalidad 3: Historial 
**Descripción:** Muestra del último pago realizado por un plan y/o Addon(s). Permite descargar la última factura realizada de acuerdo al último pago realizado en formato PDF. Consulta del historial detallado de compras realizadas por el administrador.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener un plan activo
4. (Opcional) Tener al menos un addon adquirido (Módulo 9 - Sección 2 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Descarga de última factura en formato PDF
- Caso 2: Visualización de historial de pagos

**Criterios de aceptación QA**
1. Generación y descarga de factura en formato PDF con últimos datos actualizados
2. Visualización de historial de todos los movimientos monetarios del organizador

**Pruebas de validación QA**
* Comprobar que en cualquier tipo de plan se pueda descargar la factura correspondiente al mismo.
* Validar que la cantidad de pago total es la correcta (incluyendo descuentos u otras opciones adquiridas)
* Comprobar que los datos del administrador sean correctos
* Descargar factura y comprobar que el archivo no esté dañado
* Rectificar que el historial de compras sea con base en todos los movimientos que ha realizado o si se ha mantenido en un solo plan por un tiempo considerable.

---

### Sección 2: Tienda
#### Funcionalidad 1: 
**Descripción:** Adquisición de elementos adicionales para complemento del plan actual del organizador (Addons).

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. (Opcional) Método de pago añadido 
    - Módulo 9 - Sección 1 - Funcionalidad 2
    - Módulo 9 - Sección 3 - Funcionaldad 2

**Casos de éxito**
- Caso 1: Comprar Addon(s)

**Manejo de errores**
* Fallo de compra de Addon
    - *Mensaje de error:* Por favor, completa los datos de la tarjeta antes de continuar
    - *Mensaje de error:* Por favor, completa todos los campos de datos del cliente.
    - *Caso afectado:* Caso 1, Comprar Addon(s)

**Criterios de aceptación QA**
1. Método de pago válido
2. Addóns disponibles en cada plan
3. Formulario de datos 
4. No tener ese addon adquirido

**Pruebas de validación QA**
* Comprobar que una vez adquirido un plan, no se puede volver a comprar
* Validar que el addon se aquirió con un método de pago válido
* Comprobar que cada plan tenga uno o varios addons diferentes
* Verificar que los beneficios se hayan activado en la sección de Resumen (Módulo 9 - Sección 1 - Funcionalidad 1) 
* Comprobar que el costo del addon sea el correcto
* Validación de campos
* Formato de campos

---
### Sección 3: Suscripción
#### Funcionalidad 1: Administrar suscripción
**Descripción:** Cuadro de detalles de suscripción actual del organizador con botón de opción para cambiar de plan. De forma adicional y opcional, solo en caso de que se hayan adquirido addons, ver los actuales en el perfil con opción de eliminarlos cuando se desee.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. (Opcional) Método de pago añadido 
    - Módulo 9 - Sección 1 - Funcionalidad 2
    - Módulo 9 - Sección 3 - Funcionaldad 2
4. (Opcional) Haber comprado por lo menos un Addon (Módulo 9 - Sección 2 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Vista de plan actual
- Caso 2: Cambio a plan de paga o cancelación de suscripción
- Caso 3: (Opcional) Addons adquiridos

**Manejo de errores**
- Fallo en compra de plan de pago
   - *Mensaje de error:* Por favor, completa todos los campos de datos del cliente.
   - *Mensaje de error:* Hubo un error al completar el proceso, por favor intente de nuevo
   - *Casos afectados:* Caso 2 Cambiar de plan o cancelar suscripción

**Criterios de aceptación QA**
1. Cambio de plan al realizarse el pago correctamente
2. Habilitación de beneficios al cambiar a un plan superior
3. Eliminación de Addons adquiridos disponibles en el plan anterior
4. Opción de activar elementos inactivos (en caso de tenerlos) al cambiar a un plan superior
5. Validación de funcionamiento en caso de que haya un pago pendiente
6. Validación de funcionamiento al adquirir planes teniendo cambios pendientes
7. Validación de funcionamiento al realizar un downgrade

**Pruebas de validación QA**
* Al realizar un upgrade, comprobar que el cambio se realizó al momento de comprar el plan correctamente
* Verificar que el plan comprado se haga con un método de pago válido
* Comprobar el funcionamiento en caso de que el organizador tenga un pago pendiente en el historial de compras
* Validar que no se puede hacer un cambio de plan si se realizó un dowgrade o se canceló la suscripción y la fecha aún no ha pasado
* Verificar que, si se tienen addons adquiridos en un plan anterior, se deben de eliminar al comprar un plan mayor
* Al cambiar a un plan con menores beneficios o cancelar suscripción, el cambio se realizará cuando llegue la fecha de corte del mes y se le pedirá al administrador desactivar elementos excedentes al nuevo plan adquirido.

---

#### Funcionalidad 2: Método de pago
**Descripción:** Adminisitrar métodos de pago del organizador (añadir, eliminar, elegir como predeterminada)

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. (Opcional) Tener un método de pago añadido 
    - Módulo 9 - Sección 1 - Funcionalidad 2
    - Módulo 9 - Sección 3 - Funcionaldad 2
4. (Solo para caso de éxito 3) Tener al menos dos métodos de pago

**Casos de éxito**
- Caso 1: Añadir nueva tarjeta (crédito/débito)
- Caso 2: Eliminar tarjeta
- Caso 3: Elegir tarjeta predeterminada

**Manejo de errores**
- Error al crear el método de pago
   - *Mensaje de error:* No se pudo crear el método de pago.
   - *Caso afectado:* Caso 1, añadir tarjeta

**Criterios de aceptación QA**
1. Comprobar validez de tarjeta
2. Hacer registros sin tener un límite
3. Cambiar el método de pago a predeterminado sin límite y afectar el próximo pago
4. Verificar funcionamiento y flujo al eliminar una tarjeta teniendo o no registros

**Pruebas de validación QA**
* Comprobar que la tarjeta añadida sea válida
* Verificar que se realicen los cobros a la tarjeta predeterminada
* En caso de tener más de una tarjeta, si se elimina la predeterminada, la siguiente en el reguistro se convertirá en la nueva predeterminada
* Validar que si se elimina una tarjeta y se realizará un cobro próximamente, el estado del producto cambiará a *Pendiente*
* Comprobar que los datos de la tarjeta predeterminada y los cobros realizados en la misma sean correctos en cada sección en donde se visualice.

---

#### Funcionalidad 3: Historial de compras
**Descripción:** Visualización de historial de compras adquiridas por el administrados (planes y/o addon(s))

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener un plan activo o haber adquirido uno de paga previamente (Módulo 9 - Sección 3 - Funcionalidad 1)
4. (Opcional) Haber comprado por lo menos un Addon (Módulo 9 - Sección 2 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Visualización de historial de compras

**Manejo de errores**
- Estatus de pago *Pendiente*
   - *Mensaje de error:* Tienes un pago pendiente y no podrás hacer cambios en tu suscripción hasta que se haya pagado.
- Renovación de suscripción
   - *Mensaje de error:* El pago de la renovación de tu suscripción ha sido rechazado por el emisor de tu tarjeta. Comunicate con el emisor para obtener mas ayuda o prueba con otra tarjeta o método de pago.

**Criterios de aceptación QA**
1. Visualización de productos adquiridos
2. Monto total correcto de los productos adquiridos
3. Estatus del pago realizado (Pagado/Pendiente)

**Pruebas de validación QA**
* En caso de que el administrador haya adquirido un plan de paga con una prueba gratuita, se debe de reflejar el producto en el historial hasta que se haya realizado el pago 
* En caso de adquirir uno o varios addons, se debe de reflejar junto con el plan actual del organizador
* Si el pago se realizó correctamente, el estado del pago debe de encontrarse en *Pagado*.
* El monto total debe incluir el plan actual y los addons adquiridos por el organizador.
* En caso de realizar un upgrade, debe de reflejarse un monto menor total del plan adquirido por los días restantes del plan anterior del organizador y los addons comprados.
* La tabla debe de actualizarse cada mes a partir de la fecha de pago del organizador o si se compró un plan mayor y/o Addon.
* En caso de haber un error con el siguiente pago de los productos adquiridos, el estado cambia a *Pendiente*.
* Por defecto, debe de indicarse que el primer producto adquirido es el Plan Aficionado, así este cueste $0 MXN.
