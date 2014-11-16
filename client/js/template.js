var Species_Traits = function (moves, types, ability, minstats) {
    this.moves = moves;
    this.types = types;
    this.ability = ability;
    this.stats = stats;
}

function species_by_traits(ST) {
    
    /*
    SELECT s.'name' as "Species",
        (ST.types != undefined)
            ? s.'type1' as "Type 1", s.'type2',
            : ''
        (ST.ability!= undefined)
            ? s.'ability1', s.'ability1', s.'ability1'
            : ''
        (ST.minstats || ST.maxstats != undefined)
            ? s.'basehp', 
            : ''
    */

}

function change_ability() {
    //  SELECT a.'name', a.'description' FROM 'Abilities' AS a, 'Species' AS s WHERE s.'ability1' = a.'id' OR s.'ability2' = a.'id' OR s.'ability3' = a.'id';
}

function change_item() {
    //  SELECT i.'name', i.'description' FROM 'Items';
}

function change_nature() {
    //  
}

function change_gender(value) {
    //  
}