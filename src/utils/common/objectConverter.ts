export const collectionMethodObjectConvertet = async (item: any, data: any) => {
    try {

        if(data[item['Type']] === undefined){
            if(item.Language == 'English'){
                data[item['Type']] = {
                    ...data[item['Type']],
                    "english": item
                }
            }else{
                data[item['Type']] = {
                    ...data[item['Type']],
                    "spanish": item
                }
            }

        }else{
            if(item.Language == 'English'){
                data[item['Type']] = {
                    ...data[item['Type']],
                    "english": item
                }
            }else{
                data[item['Type']] = {
                    ...data[item['Type']],
                    "spanish": item
                }
            }
        }

        return data;
       
    }
    catch (error) {
    
        return error;
    }
}