import styles from "./Places.module.css"
import React from 'react'
export function Places() {
  return (
    <table border={2} className={styles.table}>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Dirección</th>
            <th>Categoría</th>
             <th>Fecha</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Restaurante Santader </td>
            <td>Un restaurante acogedor con deliciosa comida.</td>
            <td>Avenida Piña, 984, Entre suelo 9º</td>
            <td>Restaurante</td>
            <td>07-01-2020</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Mercurio</td>
            <td>Un gran centro comercial con una amplia variedad de tiendas.</td>
            <td>Vereda Marco, Hab. 42</td>
            <td>Centro Comercial</td>
            <td>08-05-2020</td>
        </tr>
        
         <td>3</td>
            <td>parque Vetania</td>
            <td> Un espacio versátil y adecuado para la práctica de diferentes deportes y actividades recreativas.</td>
            <td>Calle Gonzalo, 799</td>
            <td>Deportes</td>
            <td>01-01-2020</td>
    </tbody>
</table>
  )
}
