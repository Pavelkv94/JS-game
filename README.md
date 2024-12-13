- place players to the grid (random position for both players) // first set players then google
- google must jump to empty cell (if player is in the cell - jump to other cell)
- stop game after google will take necessary points 


Create classes:
- информационный эксперт/создатель (GRASP) (theory)
- backward compatibility (theory)
- entity objects vs value objects (DDD) (theory)
- dependency injection
- new Position(x,y):   position1.equals(position2) === true
- new Settings  (new GridSettings), new GoogleSettings // don't do DI, пускай объекты рождаются внутри 
class Settings {
- constructore() {
-   this.GridSettings = new GridSettings();
- ...
- }
- }