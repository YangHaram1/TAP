import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen,faUnlockKeyhole,faTruck,faTicket,faClipboard,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from './Img.module.css';

const Img = ({ img }) => {
    let list;
    if (img === 'member') {
        list = <FontAwesomeIcon icon={faUserPen} className={styles.icon} />

    }
    else if (img === 'password') {

        list = <FontAwesomeIcon icon={faUnlockKeyhole} className={styles.icon} />

    }
    else if (img === 'delivery') {

        list =<FontAwesomeIcon icon={faTruck} className={styles.icon} />

    }
    else if (img === 'coupon') {

        list = <FontAwesomeIcon icon={faTicket} className={styles.icon} />

    }
    else if (img === 'board') {

        list = <FontAwesomeIcon icon={faClipboard} className={styles.icon} />

    }
    else if (img === 'withdrawal') {

        list = <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />

    }
    return list;
}
export default Img;