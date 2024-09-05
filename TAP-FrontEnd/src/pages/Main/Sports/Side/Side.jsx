import React, { useState } from 'react';
import styles from './Side.module.css'; // CSS 모듈 임포트

export const Side = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.side}>
      <ul className={styles.menuWrap}>
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          {/* No content */}
        </li>

        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="javascript:;" onClick={() => toggleMenu('baseball')}>
              야구
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'baseball' ? styles.open : ''}`} onClick={preventPropagation}>
            <li><a href="https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&amp;TeamCode=PB004">두산베어스</a></li>
            <li><a href="https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&amp;TeamCode=PB003">키움히어로즈</a></li>
          </ul>
        </li>

        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="javascript:;" onClick={() => toggleMenu('soccer')}>
              축구
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'soccer' ? styles.open : ''}`} onClick={preventPropagation}>
            <li><a href="https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&amp;TeamCode=PS006">천안시티FC</a></li>
            <li><a href="https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&amp;TeamCode=PS196">안산그리너스FC</a></li>
            <li><a href="https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&amp;TeamCode=PS011">전남 드래곤즈</a></li>
          </ul>
        </li>

        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="javascript:;" onClick={() => toggleMenu('store')}>
              스토어
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'store' ? styles.open : ''}`} onClick={preventPropagation}>
            <li><a href="https://interparkmdshop.com/category/%ED%82%A4%EC%9B%80%ED%9E%88%EC%96%B4%EB%A1%9C%EC%A6%88/29/">키움히어로즈샵</a></li>
            <li><a href="https://interparkmdshop.com/category/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4/30/">두산베어스샵</a></li>
            <li><a href="https://interparkmdshop.com/category/LG%ED%8A%B8%EC%9C%88%EC%8A%A4/31/">LG트윈스샵</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
