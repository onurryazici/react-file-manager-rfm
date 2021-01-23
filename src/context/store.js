export const initialState = {
    loading:true,         // loading spinner gösterimi için
    modalLoading:true,    // Modal üzerinde loading gösterimi için
    startLocation:"",     // İlk belirtilen dizin
    location:"",          // Aktif olarak bulunan konumun adresi
    modalLocation:"",     // Modal üzerinde ayriyeten dizin gösterebilmek için
    selectedItems:[],     // Seçilen öğeler
    selectedItemCount:0,  // Seçilen öğe sayısı 
    directoryItems:[],    // Aktif olarak bulunan konumdaki öğeler
    showHiddenFiles:"no", // Gizli dosyaların gösterimi 
    refreshRequest:false,  // Aynı konuma tekrar tıklanırsa  
    hasError:false,
}