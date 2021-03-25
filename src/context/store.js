import { compose } from 'redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
export const initialState = {
    loading:true,         // loading spinner gösterimi için
    modalLoading:true,    // Modal üzerinde loading gösterimi için
    startLocation:"",     // İlk belirtilen dizin
    location:"",          // Aktif olarak bulunan konumun adresi
    modalLocation:"",     // Modal üzerinde ayriyeten dizin gösterebilmek için
    modalSelectedItem:"", // Copy and Move modal için seçilecek klasörün adı
    selectedItems:[],     // Seçilen öğeler
    selectedItemCount:0,  // Seçilen öğe sayısı 
    directoryItems:[],    // Aktif olarak bulunan konumdaki öğeler
    modalDirectroyItems:[], // Modalda aktif olarak bulunan konumdaki öğeler
    refreshRequest:false,   // Aynı konuma tekrar tıklanırsa  
    hasError:false,         // Hata denetlemek için (kaldırılabilir)
    fileProgress:{},        // Upload takibi için
    isPreviewActive:false,  // Resim görüntülemek için
    previewData:[],         // Resim base64 verisi için
    config:[],              // RFM Api konfigurasyonu için
    depth:0,                // Ana konumdan aktif konuma olan uzaklığın hesabı
    rfmWindow:""               // RFM pencere değişimi için
}
const allEnhancers = compose( 
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
export const store = createStore(reducer, initialState, allEnhancers)