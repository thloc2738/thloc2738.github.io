### Game Truc Xanh

- Card 
    + Image (value)
    + Cover (index)
    * open
    * close
    * hide

- cards (20) 
    + render on table
    + click - open - close 
    + shuffer card


- Game logic
    onClickCard 
        + first 
            open
            firstValue
        + second 
            open
            block input ( spam click )
            secondValue === firstValue ? hide : close ( get score )
            unblock input