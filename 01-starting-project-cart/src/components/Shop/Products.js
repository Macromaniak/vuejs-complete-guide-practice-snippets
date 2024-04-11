import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: 'Item 1',
    price: 20,
    description: 'Item 1 description'
  },
  {
    id: 2,
    title: 'Item 2',
    price: 15,
    description: 'Item 2 description'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
        
      </ul>
    </section>
  );
};

export default Products;
