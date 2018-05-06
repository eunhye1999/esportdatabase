SELECT team.team_name AS TEAM,
SUM(map_comp.home_score > map_comp.away_score) > SUM(map_comp.home_score < map_comp.away_score) AS WIN,
SUM(map_comp.home_score > map_comp.away_score) < SUM(map_comp.home_score < map_comp.away_score) AS LOSE,
SUM(map_comp.home_score > map_comp.away_score AND map_comp.round<>5) AS WIN_MAP,
SUM(map_comp.home_score < map_comp.away_score AND map_comp.round<>5) AS LOSE_MAP,
SUM(map_comp.home_score = map_comp.away_score AND map_comp.round<>5) AS TIE_MAP,
SUM(map_comp.home_score > map_comp.away_score AND map_comp.round<>5) - SUM(map_comp.home_score < map_comp.away_score AND map_comp.round<>5) AS DIFF
FROM team 
INNER JOIN match_comp ON match_comp.home_team=team.id_team
INNER JOIN map_comp ON map_comp.match_comp=match_comp.id_match_comp
GROUP BY team.id_team

UNION
SELECT team.team_name AS TEAM,
SUM(map_comp.home_score > map_comp.away_score) < SUM(map_comp.home_score < map_comp.away_score) AS WIN,
SUM(map_comp.home_score > map_comp.away_score) > SUM(map_comp.home_score < map_comp.away_score) AS LOSE,
SUM(map_comp.home_score < map_comp.away_score AND map_comp.round<>5) AS WIN_MAP,
SUM(map_comp.home_score > map_comp.away_score AND map_comp.round<>5) AS LOSE_MAP,
SUM(map_comp.home_score = map_comp.away_score AND map_comp.round<>5) AS TIE_MAP,
SUM(map_comp.home_score < map_comp.away_score AND map_comp.round<>5) - SUM(map_comp.home_score > map_comp.away_score AND map_comp.round<>5) AS DIFF
FROM team 
INNER JOIN match_comp ON match_comp.away_team=team.id_team
INNER JOIN map_comp ON map_comp.match_comp=match_comp.id_match_comp
GROUP BY team.id_team
ORDER BY WIN DESC, DIFF DESC