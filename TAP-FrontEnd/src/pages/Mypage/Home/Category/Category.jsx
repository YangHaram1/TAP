import styles from './Category.module.css';
import React from 'react';
import Img from './Img/Img';
const Category = ({ img, title, contents }) => {

    return (
        <React.Fragment >
            <div className={styles.menu_div1}>
              <Img img={img}/>
            </div>
            <div className={styles.menu_div2}>
                <div>
                    {title}
                </div>
                <div>
                    {contents}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Category;