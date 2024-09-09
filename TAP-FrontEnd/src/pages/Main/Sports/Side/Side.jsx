import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Side.module.css'; // CSS 모듈 임포트

// 임시 경기 일정 데이터 (팀별 경기 일정)
const teamMatches = {
  '두산베어스': [
    { date: '2024-09-10', opponent: '롯데 자이언츠' },
    { date: '2024-09-15', opponent: '삼성 라이온즈' },
  ],
  '키움히어로즈': [
    { date: '2024-09-12', opponent: 'LG 트윈스' },
    { date: '2024-09-20', opponent: '한화 이글스' },
  ],
  '천안시티FC': [
    { date: '2024-09-08', opponent: '수원FC' },
    { date: '2024-09-18', opponent: 'FC안양' },
  ],
  '안산그리너스FC': [
    { date: '2024-09-09', opponent: '서울이랜드' },
    { date: '2024-09-16', opponent: '경남FC' },
  ],
  '전남 드래곤즈': [
    { date: '2024-09-10', opponent: '김천 상무' },
    { date: '2024-09-22', opponent: '부천FC' },
  ]
};

export const Side = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 팀 클릭 시 navigate로 경기 일정 포함 전달
  const handleTeamClick = (teamName, teamLogo, homeGround) => {
    const matches = teamMatches[teamName] || [];
    
    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches },
    });
  };

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
            <a href="#" onClick={() => toggleMenu('baseball')}>
              야구
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'baseball' ? styles.open : ''}`} onClick={preventPropagation}>
            <li>
            <a href="#" onClick={(e) => { e.preventDefault(); handleTeamClick('두산베어스', '/path/to/doosan-logo.png', '잠실야구장'); }}>
  두산베어스
</a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleTeamClick('키움히어로즈', '/path/to/kiwoom-logo.png', '고척스카이돔')}
              >
                키움히어로즈
              </a>
            </li>
          </ul>
        </li>

        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="#" onClick={() => toggleMenu('soccer')}>
              축구
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'soccer' ? styles.open : ''}`} onClick={preventPropagation}>
            <li>
              <a
                href="#"
                onClick={() => handleTeamClick('천안시티FC', '/path/to/cheonan-logo.png', '천안종합운동장')}
              >
                천안시티FC
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleTeamClick('안산그리너스FC', '/path/to/ansan-logo.png', '안산와스타디움')}
              >
                안산그리너스FC
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleTeamClick('전남 드래곤즈', '/path/to/jeonnam-logo.png', '광양축구전용구장')}
              >
                전남 드래곤즈
              </a>
            </li>
          </ul>
        </li>

        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="#" onClick={() => toggleMenu('store')}>
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
