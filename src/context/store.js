export const initialState = {
    loading:true,         // loading spinner gösterimi için
    location:"",          // Aktif olarak bulunan konumun adresi
    selectedItems:[],     // Seçilen öğeler
    selectedItemCount:0,  // Seçilen öğe sayısı 
    directoryItems:[],    // Aktif olarak bulunan konumdaki öğeler
    showHiddenFiles:"no", // Gizli dosyaların gösterimi 
    refreshRequest:false  // Aynı konuma tekrar tıklanırsa  
}