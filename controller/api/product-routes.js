const router = require('express').Router();
const { Product, Category, Supplier } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    console.log("hello");
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["category_name"]
        },
        {
          model: Supplier,
          attributes: ["supplier_name"]
        }
      ]
    });
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'An error occurred while fetching products', error: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["category_name"]
        },
        {
          model: Supplier,
          attributes: ["supplier_name"]
        }
      ]
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'An error occurred while fetching the product', error: err.message});
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: 'An error occurred while creating the product', error: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'An error occurred while updating the product', error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(`Record deleted successfully! `);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'An error occurred while deleting the product', error: err.message});
  }
});



module.exports = router;
