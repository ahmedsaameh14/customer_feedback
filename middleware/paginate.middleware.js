module.exports = (Model)=> async (req,res,next)=>{
    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) || 5 ;
    const skip = (page - 1) * limit ;
    const sortBy = req.query.sort || 'createdAt' ;
    const order = req.query.order === 'desc' ? -1 : 1 ;
    
    // 1. Extract search query
    const langQuery = req.query.lang;
    
    // 2. Build search filter
    let filter = {};
    if (langQuery) {
        // Case-insensitive search for language
        filter.language = { $regex: langQuery, $options: 'i' }; 
    }

    try{
        const [result , total] = await Promise.all([
            // 3. Apply filter to find
            Model.find(filter).sort({[sortBy]:order, _id: 1}).skip(skip).limit(limit),
            Model.countDocuments(filter) // 4. Count total with filter
        ]);
        
        res.paginatedResult = {
            page,
            limit,
            totalPages: Math.ceil(total/limit),
            totalResult: total,
            result
        }
        next();
    }catch(err){
        next(err);
    }
}