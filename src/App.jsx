import { useEffect, useState } from "react"
import ReviewCart from "./scenes/review/reviewCart"
import ProductCard from "./scenes/productCard/ProductCard"
import { useShoppingCart } from "./context/ShoppingCartContext"
import { InputMask} from '@react-input/mask'
import CartList from "./scenes/cartList/CartList"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // State для отзывов
  const [reviews,setReviews]=useState([])
  // State для товаров
  const [goods,setGoods]=useState([])
  // State для запроса страницы с товарами
  const [page,setPage]=useState(1)
  // Флаг конца страницы для прорузки новых карточек с товарами
  const [fetching,setFetching]=useState(false)
  //State для общего числа товаров
  const [totalCount,setTotalCount]=useState(0)

  // State для поля ввода телефона
  const [phone,setPhone]=useState('')
  // Флаг для указания нажатия на поле ввода
  const [phoneDirty,setPhoneDirty]=useState(false)
  // Флаг проверки корректности введенного номера
  const [checkPhone,setCheckPhone]=useState(false)

  // Проверка использования поля ввода телефона
  const blurHandler=(e)=>{
    if (e.target.name == 'phone') setPhoneDirty(true)
  }

  // Проверяем, все дли пробелы маски поля ввода телефона заполнены
  const checkPhoneInput=()=>{
    if (phone.indexOf('_')!==-1 || phone.length==0) {
      setCheckPhone(false)
    }
    else 
    if (phone.indexOf('_')==-1)
    setCheckPhone(true)
  }
  
  // Присваиваем значение введенного номера переменной phone через setState
  const phoneHandler=(e)=>{
    setPhone(e.target.value)
  }

  // Функция отправки post-запроса на сервер с данными о телефоне и составе корзины заказов
  //в случае корректного ввода телефона и 
  // В случае получения удачного ответа появляется сообщение об успешном оформлении заказа
  //В противном случае - сообщение с текстом ошибки 
  const sendCartItems=async()=>{
    checkPhoneInput()
    if (checkPhone) {
      const id=toast.loading('Обработка заказа...')
      axios.post('http://o-complex.com:1337/order',{
        "phone":phone.replace(/\D+/g,''),
        "cart":cartItems
      })
      .then(res=>{
        if (res.data.success == 1)
        toast.update(id,{render:'Заказ успешно создан!',type:'success',isLoading:false,autoClose:5000})
        else
        toast.update(id,{render:res.data.error,type:'error',isLoading:false,autoClose:5000})
        
      })
      .catch(err=>{
        console.log(err)
      })
    }
    
    }
  
  // Товары в корзине, полученные при помощи кастомного хука
  const {cartItems}=useShoppingCart()

  // Загрузка данных отзывов
  useEffect(()=>{
    axios.get('http://o-complex.com:1337/reviews',{
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=>setReviews(res.data))
  },[])

  // Загрузка данных товаров и подгрузка при достижении конца страницы
  useEffect(()=>{
    console.log(page)
    axios.get(`http://o-complex.com:1337/products?page=${page}&page_size=3`,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=>{
      setGoods([...goods,...res.data.products])
      setPage(prevState=>prevState+1)
      setTotalCount(res.data.total)
    })
    .finally(()=>setFetching(false))

  },[fetching])

  // Функция нахождения конца страницы при скролле
const scrollHandler=(e)=>{
  if (e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop + window.innerHeight)<100
  && goods.length < totalCount)
    setFetching(true)
}


  useEffect(()=>{
    document.addEventListener('scroll',scrollHandler)
    return function () {
      document.removeEventListener('scroll',scrollHandler)
    }
  })

  return (
    <>
      <div className="app">
        <div className="container">
        <div className="flex flex-col items-center">  
        {/* Заголовок страницы */}
          <div className="flex justify-center items-center bg-dark-grey mt-[13px] md:mt-[55px] md:mb-[105px] mb-[97px] rounded-rounded-15 md:w-[1442px] w-[332px] md:h-[132px] h-[108px]  ">
            <div className=" text-light-grey text-[40px] text-center md:text-[96px]">тестовое задание</div>
          </div>

          {/* Карточки с отзывами */}
          <div className="flex flex-col md:flex-row md:gap-[34px] gap-[15.9px]">
            {reviews.map((e,i)=>(
              <ReviewCart
              key={i} 
              number={i+1}
              text={e.text}/>
            ))}
          </div>  

          {/* Корзина */}
        <div className='flex flex-col items-center md:items-start md:w-[708px] w-[332px] md:mt-[243px] mt-[164px] md:mb-[47px] mb-[45px]  md:py-[10px] pt-[18px] pb-[14px] md:pl-[13px] h-auto bg-tranparent-grey rounded-rounded-15'>
          <div className='text-4xl md:mb-5 text-center'>Добавленные товары</div>
                {cartItems.map(item=>(
                <CartList key={item.id} goods={goods} id={item.id} quantity={item.quantity}/>
                ))}
            <div className='flex flex-col md:mt-5 md:flex-row md:h-[68px] gap-3  '>
                <InputMask name="phone" onBlur={e=>blurHandler(e)} mask='+7 (___) ___-__-__' replacement={{ _: /\d/ }} onChange={e=>phoneHandler(e)} showMask='true' className={`flex justify-center items-center bg-dark md:h-100 h-[68px] md:w-[401px] w-[310px] text-light-grey rounded-rounded-15 text-4xl ${(!checkPhone && phoneDirty) && 'border-2 border-red-600'}`}  />
                <button onClick={()=>{
                   sendCartItems()}
                  }
                  className=' items-center md:w-[268px] w-[310px] h-[68px] bg-dark text-light-grey rounded-rounded-15 text-4xl '>заказать</button>
            </div>
        </div>

          {/* Карты с данными о товарах*/}
          <div className="grid md:grid-cols-3 md:gap-[45px] gap-[18px]">
            {goods.map(e=>(
              <ProductCard 
              key={e.id}
              id={e.id}
              img={e.image_url}
              name={e.title}
              description={e.description}
              price={e.price}/>
            ))}
          </div>
        </div>
        </div>
        {/* Всплывающие сообщение при отправке данных о заказе */}
      <ToastContainer />
      </div>
    </>
  )
}

export default App
