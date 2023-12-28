Backend- Done with help of node and express and db used is mongodb 
create two backend api's as told 

1) Post (to create a grocery) -> (/grocery/create)
    it can handle the data like grocery name , description , quantity , price per unit and photo (optional) , expiry date (optional) , default photo will be uploaded if user doesn't upload
    the photo

 2) Get (to show all the groceries) -> (/grocery/allgrocery)
    it shows all the groceries and show them to frontend including everything like  grocery name , description , quantity , price per unit, image, expiry date.


  Frontend - Done with help of react, tailwind and redux toolkit 
  Only api to make the user redirect to dashboard (<Route path="/" element={<Dash />} />) 
  In Dash I create the simple search button where the user can search grocery name , and next add button to add new grocery to the database, also , below that Add button all the groceries 
  present in the db will be shown to the user.

 To make it more impressive I use cloudinary for the image uploading of the groceries . 
  
 Also , if user tries to enter empty grocery name , description , quantity , price per unit there will be error shown to user , also user cannot enter negative value to the quantity and 
 price per unit. 

 Command for Backend if local host -> npm start
 Command for frontend if local host - > npm start
 
  
