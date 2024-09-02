import styles from './Category.module.css';
import React from 'react';
const Category = ({ img, title, contents }) => {
    return (
        <React.Fragment >
            <div className={styles.menu_div1}>
                {img}
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