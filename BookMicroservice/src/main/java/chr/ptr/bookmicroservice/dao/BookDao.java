package chr.ptr.bookmicroservice.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import chr.ptr.bookmicroservice.entities.Book;

@Repository
public interface BookDao extends JpaRepository<Book, Integer> { }
