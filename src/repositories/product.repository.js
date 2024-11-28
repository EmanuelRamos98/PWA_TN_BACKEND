import pool from "../config/dbMysqul.config.js"
import Products from "../models/products.models.js"

// // Capa lógica de nuestra app para comunicar con la DB
// class ProductRepository {

//     /**
//      * Crea un nuevo producto
//      * @param {Object} new_product_data - datos del nuevo producto para almacenar en la DB
//      * @returns {Promise<Product>} - una Promesa que se resuelve con el producto recién creado
//      */
//     static async createProduct (new_product_data) {
//         // Crear una nueva instancia de Products con los datos del nuevo producto
//         const new_product = new Products(new_product_data)
//         // Guardar el nuevo producto en la base de datos y devolver la promesa resultante
//         return await new_product.save()
//     }

//     /**
//      * Actualiza un producto con el id dado
//      * @param {string} product_id - id del producto a actualizar
//      * @param {Object} updated_data - datos a actualizar en el producto
//      * @returns {Promise<Product>} - una Promesa que se resuelve con el producto actualizado
//      */
//     static async updateProduct (product_id, updated_data) {
//         // Encontrar y actualizar el producto por su id con los datos actualizados y devolver la promesa resultante
//         return Products.findByIdAndUpdate(product_id, updated_data)
//     }

//     /**
//      * Recupera todos los productos activos de la base de datos
//      * @returns {Promise<Array<Product>>} - Una promesa que se resuelve con un array de productos activos
//      */
//     static async getAllProducts () {
//         // Encontrar y devolver todos los productos que están activos en la base de datos
//         return Products.find({active: true})
//     }

//     /**
//      * Recupera un producto por su id
//      * @param {string} product_id - id del producto a recuperar
//      * @returns {Promise<Product>} - una Promesa que se resuelve con el producto con el id dado
//      */
//     static async getProductById (product_id) {
//         // Encontrar y devolver el producto por su id
//         return Products.findById(product_id)
//     }

//     /**
//      * Elimina un producto con el id dado
//      * @param {string} product_id - id del producto a eliminar
//      * @returns {Promise<Product>} - una Promesa que se resuelve con el producto eliminado
//      */
//     static async deleteProduct (product_id) {
//         // El {new: true} indica que debe devolver el producto actualizado
//         return Products.findByIdAndUpdate(product_id, {active: false}, {new: true})
//     }
// }



//Capa logica de nuestra app para comunicar con la DB
class ProductRepository {

    /**
     * Creates a new product
     * @param {Object} new_product_data - new product data to be stored in the DB
     * @returns {Promise<Product>} - a Promise that resolves to the newly created product
     */
    static async createProduct(new_product_data) {
        const {
            title,
            price,
            stock,
            description,
            seller_id,
            category,
            image_base64
        } = new_product_data
        const query = `
        INSERT INTO Products(title, price, stock, description, seller_id, category, image_base64)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        const [result] = await pool.execute(query, [title, price, stock, description, seller_id, category, image_base64])
        if (result.affectedRows > 0) {
            return { title, price, stock, description, seller_id, category, image_base64, id: result.insertId }
        }

    }

    /**
     * Updates a product with the given id
     * @param {string} product_id - id of the product to update
     * @param {Object} updated_data - data to be updated in the product
     * @returns {Promise<Product>} - a Promise that resolves to the updated product
     */
    static async updateProduct(product_id, updated_data) {
        const fields = Object.keys(updated_data).map(key => `${key} = ?`).join(', ')
        const values = Object.values(updated_data)
        const query = `UPDATE Products SET ${fields} WHERE id = ?`
        values.push(product_id)
        const [result] = await pool.execute( query, values)
        return result
    }

    /**
     * Retrieves all active products from the database
     * @returns {Promise<Array<Product>>} - A promise that resolves to an array of active products
     */
    static async getAllProducts() {
        const [rows] = await pool.execute('SELECT * FROM Products WHERE active = true')
        return rows
    }

    /**
     * Retrieves a product by its id
     * @param {string} product_id - id of the product to retrieve
     * @returns {Promise<Product>} - a Promise that resolves to the product with the given id
     */
    static async getProductById(product_id) {
        const [rows] = await pool.execute('SELECT * FROM Products WHERE id = ?', [product_id])
        return rows.length > 0 ? rows[0] : null
    }

    /**
     * Deletes a product with the given id
     * @param {string} product_id - id of the product to delete
     * @returns {Promise<Product>} - a Promise that resolves to the deleted product
     */
    static async deleteProduct(product_id) {
        const [result] = await pool.execute('UPDATE Products SET active = FALSE WHERE id = ?', [product_id])
        return result
    }
}

export default ProductRepository