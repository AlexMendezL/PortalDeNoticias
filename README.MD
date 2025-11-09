# DOCUMENTACIÓN PORTAL DE NOTICIAS

## DIAGRAMA DE CASOS DE USO

[![](https://img.plantuml.biz/plantuml/svg/TLDBJiCm4Dtx5ADkW4MlW8hA4h5eLLP8QEGCmQhhgUpn0Y6s781xi40S8JVX93X9qpfroCxptflFcyaY27g9EwiiFGi8WpVrYq1bF6anx5JO6hT7ZplOezvYJMjvjGGjZAwsf1HgOG-R4D4RLkf0WzbD579YD6hJ_BWPl2b8NmoaCIJuZclZ7jsbPk-98LMc2W9hW_Pg1XXWitpgE6FPYceJnFD06TxdB1ttvFlIK15eTk8Jr7pZIJbms1MjSPIiYVHIxzbezvpcCXYAeHx8Wpk2lJx51dv9rYXKis--4ZUrEQ5Tzen9TKM2DctZfCo4jptuVuF9STjDZzMeuYeBjsDVm12Xa39rUuRVZy_KVE2kxHXO7Gu0vlFhq-hEWiTb5V5i5MMYrlxpSEvg2MMcbU1Wp76mmusKRhPdCssN6gNAae_CKmjoLVjt_G40)](https://editor.plantuml.com/uml/TLDBJiCm4Dtx5ADkW4MlW8hA4h5eLLP8QEGCmQhhgUpn0Y6s781xi40S8JVX93X9qpfroCxptflFcyaY27g9EwiiFGi8WpVrYq1bF6anx5JO6hT7ZplOezvYJMjvjGGjZAwsf1HgOG-R4D4RLkf0WzbD579YD6hJ_BWPl2b8NmoaCIJuZclZ7jsbPk-98LMc2W9hW_Pg1XXWitpgE6FPYceJnFD06TxdB1ttvFlIK15eTk8Jr7pZIJbms1MjSPIiYVHIxzbezvpcCXYAeHx8Wpk2lJx51dv9rYXKis--4ZUrEQ5Tzen9TKM2DctZfCo4jptuVuF9STjDZzMeuYeBjsDVm12Xa39rUuRVZy_KVE2kxHXO7Gu0vlFhq-hEWiTb5V5i5MMYrlxpSEvg2MMcbU1Wp76mmusKRhPdCssN6gNAae_CKmjoLVjt_G40)

## DESCRIPCIÓN DEC CASOS DE USOS

### Inicio de sesión - Login

| Campo                   | Detalle                                                                                                                                                             |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Login (correo o red social)                                                                                                                                         |
| **Actor**               | Usuario                                                                                                                                                             |
| **Descripción**         | Permite al usuario acceder al portal usando su correo electrónico o mediante autenticación con redes sociales (Google, Facebook, y demás proveedores disponibles.). |
| **Precondiciones**      | El usuario debe estar registrado o contar con una cuenta en la red social.                                                                                          |
| **Flujo principal**     | 1. Ingresa correo/contraseña o selecciona red social.<br>2. Sistema valida credenciales.<br>3. Si son correctas, inicia sesión y muestra el portal principal.       |
| **Flujos alternativos** | **Credenciales incorrectas:** sistema muestra mensaje de error.<br>**Usuario no registrado:** opción de registro.                                                   |

### Registro - Signup

| Campo                   | Detalle                                                                                                                                                                               |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Registro                                                                                                                                                                              |
| **Actor**               | Usuario                                                                                                                                                                               |
| **Descripción**         | Permite al usuario crear una nueva cuenta en el portal.                                                                                                                               |
| **Precondiciones**      | Ninguna                                                                                                                                                                               |
| **Flujo principal**     | 1. Ingresa nombre, correo, contraseña y confirmación de contraseña.<br>2. Sistema valida que el correo no esté registrado.<br>3. Se crea la cuenta y el usuario puede iniciar sesión. |
| **Flujos alternativos** | **Correo existente:** sistema muestra mensaje de error.<br>**Contraseñas no son iguales:** sistema muestra mensaje de error                                                           |

### Recuperar Contraseña

| Campo                   | Detalle                                                                                                                                                                                                                |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Recuperación de contraseña                                                                                                                                                                                             |
| **Actor**               | Usuario                                                                                                                                                                                                                |
| **Descripción**         | Permite al usuario recuperar el acceso a su cuenta si olvidó la contraseña.                                                                                                                                            |
| **Precondiciones**      | Usuario debe tener una cuenta registrada.                                                                                                                                                                              |
| **Flujo principal**     | 1. Solicita recuperación de contraseña. 2. Ingresa el correo con el que se registro.<br>3. Sistema envía enlace o código al correo.<br>3. Usuario ingresa nueva contraseña.<br>4. Contraseña actualizada y confirmada. |
| **Flujos alternativos** | N/A                                                                                                                                                                                                                    |

### Logout

| Campo                   | Detalle                                                                                 |
|-------------------------|-----------------------------------------------------------------------------------------|
| **Caso de uso**         | Logout                                                                                  |
| **Actor**               | Usuario                                                                                 |
| **Descripción**         | Permite cerrar sesión de forma segura.                                                  |
| **Precondiciones**      | Usuario debe estar logueado.                                                            |
| **Flujo principal**     | 1. Selecciona opción de logout.<br>2. Sistema cierra sesión y redirige al inicio/login. |
| **Flujos alternativos** | N/A                                                                                     |

### Ver noticias

| Campo                   | Detalle                                                                                                                                                    |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Ver noticias                                                                                                                                               |
| **Actor**               | Usuario                                                                                                                                                    |
| **Descripción**         | Permite al usuario ver la lista de noticias recientes o destacadas.                                                                                        |
| **Precondiciones**      | Usuario debe estar logueado.                                                                                                                               |
| **Flujo principal**     | 1. Accede a sección de noticias.<br>2. Sistema muestra lista de noticias disponibles.                                                                      |
| **Flujos alternativos** | **Usuario no logueado:** No se le permite acceder a ver las noticias.  </br>**Sesión expirada:** El sistema redirecciona al usuario a la pantalla de login |

### Ver categorias de noticias

| Campo                   | Detalle                                                                                                                                                    |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Ver categorías de noticias                                                                                                                                 |
| **Actor**               | Usuario                                                                                                                                                    |
| **Descripción**         | Permite filtrar y explorar noticias por categorías (Deportes, Tecnología, Política, etc.).                                                                 |
| **Precondiciones**      | Usuario debe estar logueado.                                                                                                                               |
| **Flujo principal**     | 1. Selecciona sección de categorías.<br>2. Sistema muestra todas las categorías.<br>3. Selecciona categoría y muestra noticias correspondientes.           |
| **Flujos alternativos** | **Usuario no logueado:** No se le permite acceder a ver las noticias.  </br>**Sesión expirada:** El sistema redirecciona al usuario a la pantalla de login |

### Ver detalle de noticia

| Campo                   | Detalle                                                                                                |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Ver detalle de noticia                                                                                 |
| **Actor**               | Usuario                                                                                                |
| **Descripción**         | Permite al usuario ver la noticia completa con su contenido.                                           |
| **Precondiciones**      | Debe existir al menos una noticia publicada y el usuario debe estar logueado.                          |
| **Flujo principal**     | 1. Selecciona noticia de la lista o categoría.<br>2. Sistema muestra contenido completo de la noticia. |
| **Flujos alternativos** | N/A                                                                                                    |

### Ver noticia relacionadas

| Campo                   | Detalle                                                                                                              |
|-------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Caso de uso**         | Ver noticias relacionadas                                                                                            |
| **Actor**               | Usuario                                                                                                              |
| **Descripción**         | Desde el detalle de una noticia, el usuario puede acceder a otras noticias relacionadas por tema o categoría.        |
| **Precondiciones**      | Debe haber noticias relacionadas disponibles                                                                         |
| **Flujo principal**     | 1. Sistema muestra sección de noticias relacionadas.<br>2. Usuario puede seleccionar cualquiera para ver su detalle. |
| **Flujos alternativos** | N/A                                                                                                                  |

## DIAGRAMA DE CLASE

[![](https://img.plantuml.biz/plantuml/svg/XLHDRzim3BtxLt3fOGuMdxRBWY9e-X6Wm30Cst8g2aEnM5UeB0MIt2Heyjz7oLPiBocgN4BoyP7lMVQLTSoukfA9VH5gpGohOCMAbzBeMl4RBRM1YyLt_-iXx3FZUYDK2SxKs2iKabaBRmd0t1YzQVk_XKF9QsqucZRxDPpaa2IVE3u9XU3OIcAw7RSqMxYyXFJlv6AncDCPmsoM94rfQT5GzKuvuNQpMPZu1GIVmd9vVni2nIgSWdKcH5Wn8RjmJIGRMgRB50QPGvupDmLE_voeC1JgDJzNoB9GbReKActOYMhICLCqdi9AQnc01ajX7Peqx1MWxtTvUP5UrouT4XNw5KqUMxhX4NM8BlrXhyX_uiP-O5LDu_AXUTGKCX_OqxfWQL3kUz98vPacHvfckUCweQT4b_i-Vjf8s1zareF7FdevQxgHh4GO1J7ftPQCL4p2_DVzU1GKGNjdpgdrfr7Sg6bY0aWSfWeILcgpwtlXJr3PGFpMOT_XZl-NyzKkZsnfd_PKtaahHqSFD1rwrze6G6vqQczQvlSLzrGCNuapkfYKSMc1dS8uvB6TJnjyXjyeMI6qGfk4Tt6_ppBzrhjnKnZvfsj7IPSxw2pRxo7M3JwXGLLuq559InGnpuoAoHKgxhzH_m00)](https://editor.plantuml.com/uml/XLHDRzim3BtxLt3fOGuMdxRBWY9e-X6Wm30Cst8g2aEnM5UeB0MIt2Heyjz7oLPiBocgN4BoyP7lMVQLTSoukfA9VH5gpGohOCMAbzBeMl4RBRM1YyLt_-iXx3FZUYDK2SxKs2iKabaBRmd0t1YzQVk_XKF9QsqucZRxDPpaa2IVE3u9XU3OIcAw7RSqMxYyXFJlv6AncDCPmsoM94rfQT5GzKuvuNQpMPZu1GIVmd9vVni2nIgSWdKcH5Wn8RjmJIGRMgRB50QPGvupDmLE_voeC1JgDJzNoB9GbReKActOYMhICLCqdi9AQnc01ajX7Peqx1MWxtTvUP5UrouT4XNw5KqUMxhX4NM8BlrXhyX_uiP-O5LDu_AXUTGKCX_OqxfWQL3kUz98vPacHvfckUCweQT4b_i-Vjf8s1zareF7FdevQxgHh4GO1J7ftPQCL4p2_DVzU1GKGNjdpgdrfr7Sg6bY0aWSfWeILcgpwtlXJr3PGFpMOT_XZl-NyzKkZsnfd_PKtaahHqSFD1rwrze6G6vqQczQvlSLzrGCNuapkfYKSMc1dS8uvB6TJnjyXjyeMI6qGfk4Tt6_ppBzrhjnKnZvfsj7IPSxw2pRxo7M3JwXGLLuq559InGnpuoAoHKgxhzH_m00)

## DIAGRAMA DE FLUJO

### Inicio de sesión - Login

[![](https://img.plantuml.biz/plantuml/svg/HO-n3S9034Nxcy9bKj6J0YGg2ae6C8a9HXSRsHV4EXc00Z404hSO5oYe_6K_-ybhJsXf76BuXh3S-uZ62dWmWakUUXQ4ZY1gIKrORgKtSWGQaEEYLKc6Jlc1e3y6N5l6s0G-GlL-ROmwahb33jSyHUxGLpMa4mbKdkzr02XNkItIud5opay1kd5IrwPCFUabK7I2IlIBxzIBrc0WSJpJl4TcQdzQEZw6TIdpQny0)](https://editor.plantuml.com/uml/HO-n3S9034Nxcy9bKj6J0YGg2ae6C8a9HXSRsHV4EXc00Z404hSO5oYe_6K_-ybhJsXf76BuXh3S-uZ62dWmWakUUXQ4ZY1gIKrORgKtSWGQaEEYLKc6Jlc1e3y6N5l6s0G-GlL-ROmwahb33jSyHUxGLpMa4mbKdkzr02XNkItIud5opay1kd5IrwPCFUabK7I2IlIBxzIBrc0WSJpJl4TcQdzQEZw6TIdpQny0)

### Registro - Signup

[![](https://img.plantuml.biz/plantuml/svg/HL2nRSGm3Emr1KiR-0di8WyaALAa2V3f-HRj4915WvAzpm-G8lW10aIBXLAALA9unpiUpocZvdqDhXLkkAGTbGNmgWHRkIqS4Jo1qi8fgunkU8cBKaA8iXhf1BGYXnDC4hDYelA5Hdh7m1uLF6P9e-CPkf_lf_g1ezmCa_JGG_wW25qgdxq361wLR6BQAURckV_jCbRiEHvSGL4bgQ3PpQmhJbpkfY7Rn18nz8tzHfwL5rP0268PQZTbsHo5HD15QOQlOf5CbLJ58bNPe-tTHFzdekVPdUsfX_e5)](https://editor.plantuml.com/uml/HL2nRSGm3Emr1KiR-0di8WyaALAa2V3f-HRj4915WvAzpm-G8lW10aIBXLAALA9unpiUpocZvdqDhXLkkAGTbGNmgWHRkIqS4Jo1qi8fgunkU8cBKaA8iXhf1BGYXnDC4hDYelA5Hdh7m1uLF6P9e-CPkf_lf_g1ezmCa_JGG_wW25qgdxq361wLR6BQAURckV_jCbRiEHvSGL4bgQ3PpQmhJbpkfY7Rn18nz8tzHfwL5rP0268PQZTbsHo5HD15QOQlOf5CbLJ58bNPe-tTHFzdekVPdUsfX_e5)

### Recuperar Contraseña

[![](https://img.plantuml.biz/plantuml/svg/dP6nJiGm38RtF8NLgPtOhmCdeHiO4D99iFjIj-TJufpije97Oc10F00IVJ7Izf2EbIbH_Ft-R6LhFMe_nE2MYziysO3A2Oxe2NnW3oHGF8QHc-aD8eDFqYiQJHzOr6vpBvsI8L143g3KiULoatBfcPHRzgXW31Gk2BraWch7BPJVNxkhjziA-cEsbJQzLmvWivEHSveav65kV5Ab10rbYn_EfEXv-fHw9X_IR5M898OdWc9F8nk13N10QUY4SsxjOCKI-LtKk1leue1Ny1WFZDTRBlHTafOrPiK2fBNT7yRwT7OKihMKLFrlghM7DDowRJxcV_a1)](https://editor.plantuml.com/uml/dP6nJiGm38RtF8NLgPtOhmCdeHiO4D99iFjIj-TJufpije97Oc10F00IVJ7Izf2EbIbH_Ft-R6LhFMe_nE2MYziysO3A2Oxe2NnW3oHGF8QHc-aD8eDFqYiQJHzOr6vpBvsI8L143g3KiULoatBfcPHRzgXW31Gk2BraWch7BPJVNxkhjziA-cEsbJQzLmvWivEHSveav65kV5Ab10rbYn_EfEXv-fHw9X_IR5M898OdWc9F8nk13N10QUY4SsxjOCKI-LtKk1leue1Ny1WFZDTRBlHTafOrPiK2fBNT7yRwT7OKihMKLFrlghM7DDowRJxcV_a1)

### Logout

[![](https://img.plantuml.biz/plantuml/svg/FOsn3SCm30HxJK5uWVHsOo2P88078AI7GqIX358Qo3Du12yMnKMwmrrnirUssZuvN136nHkR57fn1CKiaQ0qt676HWwNyz1X2kC3Ngt9tzrgUKDxU2A9oTeBKsRQpdqLPKgWN3fDVLIsC4FJx_e5)](https://editor.plantuml.com/uml/FOsn3SCm30HxJK5uWVHsOo2P88078AI7GqIX358Qo3Du12yMnKMwmrrnirUssZuvN136nHkR57fn1CKiaQ0qt676HWwNyz1X2kC3Ngt9tzrgUKDxU2A9oTeBKsRQpdqLPKgWN3fDVLIsC4FJx_e5)

### Ver noticias

[![](https://img.plantuml.biz/plantuml/svg/FKwn3SCm3Djz1SVuXMHerWuTUu3WAAW0rIei-QnUqSVg54K6WWH945mzg4L_Qlg9DD_Cer63oZ2mCQg5525VakoOxjwfYS5PkHInIkW3_z8b8nvSCVdddHCmNnj8nqgGAXzhUdQNaNlOAx4wOwgMJwDkigTrqF7h2m00)](https://editor.plantuml.com/uml/FKwn3SCm3Djz1SVuXMHerWuTUu3WAAW0rIei-QnUqSVg54K6WWH945mzg4L_Qlg9DD_Cer63oZ2mCQg5525VakoOxjwfYS5PkHInIkW3_z8b8nvSCVdddHCmNnj8nqgGAXzhUdQNaNlOAx4wOwgMJwDkigTrqF7h2m00)

### Ver noticias por categoria

[![](https://img.plantuml.biz/plantuml/svg/RL0n3i8m3Dpp2e_j5zg1hWo8YGUugGkHGbpPxhFwYdwCf882Wi6ovJlVwTofeTXyZsuRN7FH6IKmO2y44ujXX84WiGKVK5lNd5XDK226V58mZqPNbdNPu9U0KYJl0oVy86Jyt1ibabsnc7mpVWpUvc64we_1dEj9EjHWDqfGwRhK3g0v2cmHSf18HItkt3RZQZmvYafG9QxtHHh2wBhSociU)](https://editor.plantuml.com/uml/RL0n3i8m3Dpp2e_j5zg1hWo8YGUugGkHGbpPxhFwYdwCf882Wi6ovJlVwTofeTXyZsuRN7FH6IKmO2y44ujXX84WiGKVK5lNd5XDK226V58mZqPNbdNPu9U0KYJl0oVy86Jyt1ibabsnc7mpVWpUvc64we_1dEj9EjHWDqfGwRhK3g0v2cmHSf18HItkt3RZQZmvYafG9QxtHHh2wBhSociU)

### Ver detalle de noticia y noticias relacionadas

[![](https://img.plantuml.biz/plantuml/svg/NL0x3i8m3Drp2ekfNA4TA69037man07Sn0LB8KP92gVY55mCfnAeCFdpVfRRb37cuUhDs9Zwb0QCB81T972KqVjI8KXcozYOUYifHunW9MGAxAJ07YUCVQS0nSycGIIFbYMWqy5HKi7oi9buUTRuISolf37SG_Mvx8AMm7gsG05cQrqw_6RD5dF85mMgz7hE3K3zHoYYZ9tUUyGxkHqzr5vfAmaznwiIpwF0IMCeEExrCN8phVRbIsy0)](https://editor.plantuml.com/uml/NL0x3i8m3Drp2ekfNA4TA69037man07Sn0LB8KP92gVY55mCfnAeCFdpVfRRb37cuUhDs9Zwb0QCB81T972KqVjI8KXcozYOUYifHunW9MGAxAJ07YUCVQS0nSycGIIFbYMWqy5HKi7oi9buUTRuISolf37SG_Mvx8AMm7gsG05cQrqw_6RD5dF85mMgz7hE3K3zHoYYZ9tUUyGxkHqzr5vfAmaznwiIpwF0IMCeEExrCN8phVRbIsy0)

### Consumo de API

[![](https://img.plantuml.biz/plantuml/svg/JOz12i9034NtSueisokq2tKb2chH4uHEYYFjf2GfU2dF8EZ5J8k8ky_F-qd-MWt5fg4FYmXLmsBOWtAVscG8cSq5AaJIIB1fTa1t8ybOXzH1yNgUISU9F0xVUSiYr1gkIh0hPIZq_IW3GDMWAA50H6E5_ULqh6TxEw54jus6aSMFCmoi9ZEPbaq3PQE5FNm7lxSSdzGN9Au3zKfGP2x_ISygtcX-ZaHO7CinTTwNnx1sFPV_0000)](https://editor.plantuml.com/uml/JOz12i9034NtSueisokq2tKb2chH4uHEYYFjf2GfU2dF8EZ5J8k8ky_F-qd-MWt5fg4FYmXLmsBOWtAVscG8cSq5AaJIIB1fTa1t8ybOXzH1yNgUISU9F0xVUSiYr1gkIh0hPIZq_IW3GDMWAA50H6E5_ULqh6TxEw54jus6aSMFCmoi9ZEPbaq3PQE5FNm7lxSSdzGN9Au3zKfGP2x_ISygtcX-ZaHO7CinTTwNnx1sFPV_0000)

## ENTIDAD RELACION

[![](https://img.plantuml.biz/plantuml/svg/dLJHRjem57ttLzonXy6qFA2r3wiGQaY2XhHE5OLfRvM9Ry6gOqUsCwWA_rudE2afgLJDUKdkERu-v_WgryPIROjC4FF8PKurpM15qyUrLeLaaH9Am-VfZ_8vOPWDPMhBvHgiBl04I0Kr1fu9mAJTP3HQ6jJZiMisZUDesCNuZLjJCg9XCfnEknXtz1-ocXPVkbQTZI9gSQtqq_6uv69owLYXrchh3LrKgzogD4Fjgz-hHGw4V6Bum2M2fIk1_Tt0-zh1Q0JznJVND7Hh0ECn8RaxdQuHUhzKIWN4arxb7_oUqZOqxey8m5VW3AvWkPp5lX84_aNI31tq9vn7FyEvBs96kJYhvkw0hNDm1gGQNGJidbe7BMOtoTqYlBdrO96pzq1d_LLv4pQqW_-0XyAvlN-BIhVzMFoms4Dv6Kt0bPP-ihEefKiwl9qDsbbxiTqwsuSsKYstuZnlKsGPrK-beEJledQbEwwWM0bkDkzbdVf9V1D6A-TwMg4rkFyxAGnDgdbkkPAdwgialy0S1KqTX8PKWxdV1u5wFhdgA-WPzs5wvBLsK46mtqEDQtn0ZJ8jIOrstwZcRAW3oJLALlvQNW00)](https://editor.plantuml.com/uml/dLJHRjem57ttLzonXy6qFA2r3wiGQaY2XhHE5OLfRvM9Ry6gOqUsCwWA_rudE2afgLJDUKdkERu-v_WgryPIROjC4FF8PKurpM15qyUrLeLaaH9Am-VfZ_8vOPWDPMhBvHgiBl04I0Kr1fu9mAJTP3HQ6jJZiMisZUDesCNuZLjJCg9XCfnEknXtz1-ocXPVkbQTZI9gSQtqq_6uv69owLYXrchh3LrKgzogD4Fjgz-hHGw4V6Bum2M2fIk1_Tt0-zh1Q0JznJVND7Hh0ECn8RaxdQuHUhzKIWN4arxb7_oUqZOqxey8m5VW3AvWkPp5lX84_aNI31tq9vn7FyEvBs96kJYhvkw0hNDm1gGQNGJidbe7BMOtoTqYlBdrO96pzq1d_LLv4pQqW_-0XyAvlN-BIhVzMFoms4Dv6Kt0bPP-ihEefKiwl9qDsbbxiTqwsuSsKYstuZnlKsGPrK-beEJledQbEwwWM0bkDkzbdVf9V1D6A-TwMg4rkFyxAGnDgdbkkPAdwgialy0S1KqTX8PKWxdV1u5wFhdgA-WPzs5wvBLsK46mtqEDQtn0ZJ8jIOrstwZcRAW3oJLALlvQNW00)