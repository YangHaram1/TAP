import { Route, Routes } from 'react-router-dom';
import styles from './AdminContent.module.css'
import { Dash } from './Dash/Dash';
import { UserMem } from './Members/UserMem/UserMem';
import { BizMem } from './Members/BizMem/BizMem';
import Chat from './Chat/Chat';
import { ProductsManage } from './Products/ProductsManage/ProductsManage';
import { Orders } from './Orders/Orders';

import { ProductsRegister } from './Products/ProductsApply/ProductsRegister';
import { DetailProduct } from './DetailProducts/DetailProduct';
import { DetailRegist } from './Products/ProductsApply/ProductsRegister/DetailRegist/DetailRegist';
import { SaleRegister } from './Products/ProductsApply/SaleRegister/SaleRegister';
import { DetailSale } from './Products/ProductsApply/SaleRegister/DetailSale/DetailSale';
import { Log } from './Log/Log';
import Inquiry from './Inquiry/Inquiry';
import Coupon from './Coupon/Coupon';
import Grade from './Grade/Grade';

export const AdminContent =()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/*" element={<Dash/>}/>
                <Route path="/products/product/*" element={<ProductsManage/>}/>
                <Route path="/products/:application_seq" element={<DetailProduct />} />
                <Route path="/products/apply/*" element={<ProductsRegister/>}/>
                <Route path="/products/apply/:application_seq" element={<DetailRegist />} />
                <Route path="/products/apply/sale/*" element={<SaleRegister/>}/>
                <Route path="/products/apply/sale/:application_seq" element={<DetailSale/>}/>
                <Route path="/orders/user/*" element={<Orders/>}/>
                <Route path="/members/user/*" element={<UserMem/>}/>
                <Route path="/members/biz/*" element={<BizMem/>}/>
                <Route path='/support/chat/*' element={<Chat/>}/>
                <Route path='/support/inquiry/*' element={<Inquiry/>}/>
                <Route path='/coupon' element={<Coupon/>}/>
                <Route path='/grade' element={<Grade/>}/>
                <Route path='/log/*' element={<Log/>}/>
            </Routes>
        </div>
    );
}