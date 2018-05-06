SELECT team.team_name AS TEAM,
SUM(map_comp.home_score > map_comp.away_score) AS HOME_SCORE,
SUM(map_comp.home_score < map_comp.away_score) AS AWAY_SCORE,
(SELECT team.team_name FROM team WHERE team.id_team=match_comp.away_team) AS AWAY_TEAM,
match_comp.date_start AS DATE,
match_comp.t_start AS TIME
FROM team 
INNER JOIN match_comp ON match_comp.home_team=team.id_team
LEFT JOIN map_comp ON map_comp.match_comp=match_comp.id_match_comp
GROUP BY match_comp.id_match_comp