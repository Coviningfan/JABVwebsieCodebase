-- Check existing tables and columns
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name IN ('clients', 'projects', 'user_profiles')
ORDER BY 
    table_name, 
    ordinal_position;