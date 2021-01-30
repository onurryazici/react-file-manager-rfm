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
    refreshRequest:false,  // Aynı konuma tekrar tıklanırsa  
    hasError:false,        // Hata denetlemek için (kaldırılabilir)
    fileProgress:{}        // Upload takibi için
}